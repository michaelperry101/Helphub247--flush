import Layout from '../components/Layout'
export default function Cancel(){
  return (
    <Layout>
      <div style={{padding:24,maxWidth:900,margin:'0 auto'}}>
        <h1>Checkout Cancelled</h1>
        <p className="small">Your checkout process was cancelled. No charges were made.</p>
      </div>
    </Layout>
  )
}
