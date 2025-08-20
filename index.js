import Layout from '../components/Layout'
import {useState, useRef, useEffect} from 'react'
import axios from 'axios'

export default function Home(){
  const [open,setOpen]=useState(false)
  const [chat,setChat]=useState([{role:'assistant',content:'👋 Hi — I\'m Carys. How can I help today?'}])
  const [input,setInput]=useState('')
  const [loading,setLoading]=useState(false)
  const [cookieVisible,setCookieVisible]=useState(true)
  const bodyRef=useRef(null)

  useEffect(()=>{
    const seen = localStorage.getItem('hh_cookie_consent');
    if(seen==='1') setCookieVisible(false);
    if(open && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  },[open])

  const acceptCookies = ()=>{ localStorage.setItem('hh_cookie_consent','1'); setCookieVisible(false); }

  const send=async()=>{
    const text=input.trim(); if(!text) return;
    const next=[...chat,{role:'user',content:text}]; setChat(next); setInput(''); setLoading(true);
    try{
      const res = await axios.post('/api/chat',{messages: next.slice(-12)});
      setChat(prev=>[...next,{role:'assistant',content:res.data.reply}]);
    }catch(e){
      setChat(prev=>[...next,{role:'assistant',content:'Carys is not configured — add OPENAI_API_KEY in Vercel settings.'}]);
    }finally{setLoading(false); if(bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight}
  }

  const subscribe=async()=>{
    try{
      const r = await axios.post('/api/checkout',{plan:'monthly'});
      if(r.data.url) window.location.href = r.data.url;
      else alert('Checkout failed');
    }catch(e){alert('Checkout error')}
  }

  return (<Layout>
    <section className="hero">
      <div className="layout">
        <div className="left">
          <span className="small">UK-based · 24/7 support</span>
          <h1 className="h-title">Your AI Helpline, Anytime, Anywhere</h1>
          <p className="h-sub">Carys — Conversational Assistant for Responsive Yielding Solutions. Fast, helpful, private support for life & work.</p>
          <div className="cta">
            <button className="btn-primary" onClick={subscribe}>Start £9.99/month</button>
            <button className="btn-ghost" onClick={()=>setOpen(true)}>Open Carys</button>
          </div>
          <div className="features">
            <div className="feature card"><h4>🔒 Private by design</h4><p className="small">We do not sell your data and follow UK GDPR principles.</p></div>
            <div className="feature card"><h4>🕒 Always available</h4><p className="small">Carys is ready whenever you need.</p></div>
            <div className="feature card"><h4>🤖 Practical answers</h4><p className="small">Concise, actionable guidance.</p></div>
            <div className="feature card"><h4>💷 Simple pricing</h4><p className="small">One plan: £9.99/month. Cancel anytime.</p></div>
          </div>
        </div>
        <div className="right">
          <div className="card">
            <h3>Why users love Carys</h3>
            <p className="small">Quick responses, empathetic tone, and clear next steps — without long waits.</p>
            <div className="eq success"><strong>Beta ready:</strong> this version includes Stripe Checkout and server-side AI (add keys in Vercel).</div>
          </div>
        </div>
      </div>
    </section>

    <section id="pricing" className="section">
      <div className="card">
        <h3>Pricing</h3>
        <div className="eq">
          <strong className="h-title">£9.99 <span className="small">/ month</span></strong>
          <p className="small">Unlimited access to Carys. Cancel anytime via Stripe.</p>
          <div className="form-row"><button className="btn-primary" onClick={subscribe}>Subscribe £9.99/mo</button></div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="card notice small"><strong>Note:</strong> For the chat to respond you must set <code>OPENAI_API_KEY</code> in Vercel Environment Variables and redeploy.</div>
    </section>

    {/* Chat widget */}
    <button className="chat-fab" onClick={()=>setOpen(!open)} aria-label="Open chat">💬</button>
    <div className={`chat-widget ${open? 'open':''}`} role="dialog" aria-modal="true">
      <div className="w-header"><div className="w-title">Carys — HelpHub247</div><button onClick={()=>setOpen(false)} className="btn-ghost">Close</button></div>
      <div className="w-body" ref={bodyRef}>
        {chat.map((m,i)=>(<div key={i} className={`msg ${m.role==='user'? 'user':'bot'}`}>{m.content}</div>))}
        {loading && <div className="msg bot">Carys is typing…</div>}
      </div>
      <div className="w-input">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send() }} placeholder="Ask Carys…" />
        <button onClick={send}>Send</button>
      </div>
    </div>

    {/* Cookie banner */}
    <div className={`cookie-banner ${cookieVisible? '': 'cookie-hidden'}`} role="region" aria-label="Cookie consent">
      <div className="small">We use cookies to improve your experience. By using this site you accept our cookie policy.</div>
      <div style={{display:'flex',gap:8}}><button className="btn-ghost" onClick={()=>{window.location.href='/privacy'}}>Privacy</button><button className="btn-primary" onClick={acceptCookies}>Accept</button></div>
    </div>
  </Layout>)
}
