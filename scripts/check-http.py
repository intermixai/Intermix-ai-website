import urllib.request,urllib.error,json,subprocess,time,os
from html.parser import HTMLParser
from urllib.parse import urlsplit
class Inspect(HTMLParser):
 def __init__(self):super().__init__();self.h1=0;self.links=[];self.ids=set();self.meta={};self.labels=[];self.fields=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='h1':self.h1+=1
  if 'id' in a:self.ids.add(a['id'])
  if t=='a':self.links.append(a.get('href',''))
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content')
  if t=='label':self.labels.append(a.get('for'))
  if t in ['input','select','textarea']:self.fields.append(a)
base='http://127.0.0.1:3100'
server=subprocess.Popen(['node','node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3100'],stdout=subprocess.PIPE,stderr=subprocess.STDOUT,env={**os.environ,"SITE_URL":base,"ALLOW_INDEXING":"false"})
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
def get(path):return opener.open(base+path,timeout=5)
try:
 for attempt in range(50):
  try:get('/');break
  except (urllib.error.URLError,TimeoutError):time.sleep(.1)
 paths=['/','/services','/about','/faq','/contact','/privacy'];pages={}
 for p in paths:
  r=get(p);html=r.read().decode();parser=Inspect();parser.feed(html);pages[p]=parser
  assert parser.h1==1,(p,'h1 count',parser.h1)
  for m in ['description','og:title','og:description','og:image','twitter:card']:assert parser.meta.get(m),(p,m)
  assert parser.meta.get('robots')=='noindex, nofollow',(p,'preview indexing')
  print(json.dumps({'page':p,'status':r.status,'h1':parser.h1,'metadata':'pass','htmlBytes':len(html),'links':len(parser.links)}))
 for p,parser in pages.items():
  for link in parser.links:
   u=urlsplit(link)
   if u.scheme or u.netloc:continue
   target=u.path or p
   assert target in pages,(p,link,'missing route')
   if u.fragment:assert u.fragment in pages[target].ids,(p,link,'missing anchor')
 print('All internal links and anchors resolve.')
 for f in pages['/contact'].fields:assert f.get('id') in pages['/contact'].labels,('missing label',f)
 print('All contact fields have associated labels.')
 for p in ['/industries','/why-intermix-ai','/resources','/resources/frameworks/old','/services/ai-readiness-assessment','/terms']:
  r=get(p);assert urlsplit(r.url).path != p;print(p,'->',urlsplit(r.url).path+'#'+urlsplit(r.url).fragment,r.status)
 for p in ['/icon.svg','/opengraph-image','/robots.txt','/sitemap.xml']:
  r=get(p);print(p,r.status,r.headers.get('Content-Type'))
 try:get('/no-such-page');raise AssertionError('Expected 404')
 except urllib.error.HTTPError as e:assert e.code==404;print('Missing page: proper 404')
 req=urllib.request.Request(base+'/api/contact',method='POST',headers={'Content-Type':'application/json','Origin':base},data=json.dumps({'name':'QA','email':'qa@example.com','company':'Example','title':'COO','companySize':'$50M–$100M revenue','primaryInterest':'AI Adoption Review','message':'QA local only','website':'','requestId':'798e19ba-4148-4c95-81bd-d6df78311885','source':'/contact','utm':{}}).encode())
 try:opener.open(req);raise AssertionError('Expected unavailable response')
 except urllib.error.HTTPError as e:assert e.code==503;print('Missing integration HTTP:',e.code,e.read().decode())
finally:
 server.terminate()
 try:server.wait(timeout=5)
 except subprocess.TimeoutExpired:server.kill()
 output=server.stdout.read().decode()
 print('Server log:',output)
 assert 'Error:' not in output,output
