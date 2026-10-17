"""Run with the local Label Studio/MCP venv. Does not create review annotations."""
import asyncio,json,sys
from pathlib import Path
from mcp import Client,StdioServerParameters

ROOT=Path(__file__).resolve().parents[1]
async def main():
    params=StdioServerParameters(command=sys.executable,args=[str(ROOT/'integrations/label-studio/mcp_server.py')])
    async with Client(params)as client:
        result=await client.list_tools()
        tools=result.tools
        assert {t.name for t in tools}=={'laptop_claims','labelstudio_project_status','labelstudio_reviews'}
        assert all(t.annotations.read_only_hint for t in tools)
        claims=await client.call_tool('laptop_claims',{'product_id':'h255'})
        assert not claims.is_error
        body=json.loads(claims.content[0].text)
        assert len(body['claims'])==12
        assert all(x['source_url'].startswith('https://')for x in body['claims'])
        bad=await client.call_tool('laptop_claims',{'product_id':'../../private'})
        assert bad.is_error
        bad=await client.call_tool('labelstudio_reviews',{'limit':1000})
        assert bad.is_error
        status=await client.call_tool('labelstudio_project_status',{})
        assert not status.is_error
        reviews=await client.call_tool('labelstudio_reviews',{})
        assert not reviews.is_error
        print('MCP handshake and all 3 read-only tools passed; invalid inputs rejected.')
        print('Local Label Studio status:',status.content[0].text)
if __name__=='__main__':asyncio.run(main())
