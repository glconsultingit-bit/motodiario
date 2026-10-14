
import { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'

const LS_MOTOS = 'moto_diario_motos'
const LS_SPESE = 'moto_diario_spese'
const LS_SCAD = 'moto_diario_scadenze'

export default function App(){
  const [motos, setMotos] = useState(()=> JSON.parse(localStorage.getItem(LS_MOTOS)||'[]'))
  const [spese, setSpese] = useState(()=> JSON.parse(localStorage.getItem(LS_SPESE)||'[]'))
  const [scadenze, setScadenze] = useState(()=> JSON.parse(localStorage.getItem(LS_SCAD)||'[]'))
  const [view, setView] = useState('garage')
  const [selectedMoto, setSelectedMoto] = useState(null)

  useEffect(()=>{localStorage.setItem(LS_MOTOS, JSON.stringify(motos))},[motos])
  useEffect(()=>{localStorage.setItem(LS_SPESE, JSON.stringify(spese))},[spese])
  useEffect(()=>{localStorage.setItem(LS_SCAD, JSON.stringify(scadenze))},[scadenze])

  const addMoto = (m)=>{
    const nm = {...m, id: Date.now().toString(), created_at: new Date().toISOString()}
    setMotos([...motos, nm])
  }

  const addSpesa = (s)=>{
    const ns = {...s, id: Date.now().toString(), data: new Date().toISOString()}
    setSpese([...spese, ns])
    // aggiorna km moto
    if(s.km_moto){
      setMotos(motos.map(m=> m.id===s.moto_id ? {...m, km_attuali: Math.max(m.km_attuali||0, s.km_moto)} : m))
    }
  }

  const motoSpese = (id)=> spese.filter(s=>s.moto_id===id)
  const calcEuroKm = (id)=>{
    const list = motoSpese(id)
    if(list.length<2) return 0
    const tot = list.reduce((a,b)=>a+Number(b.euro||0),0)
    const kms = Math.max(...list.map(s=>s.km_moto||0)) - Math.min(...list.map(s=>s.km_moto||0))
    return kms>0 ? (tot/kms).toFixed(2) : 0
  }

  return (
    <div style={{maxWidth:480,margin:'0 auto',padding:16, paddingBottom:80}}>
      <h1 style={{fontSize:28,fontWeight:800}}>🏍️ Moto Diario</h1>
      <p style={{opacity:0.7}}>Quanto ti costa davvero andare in moto?</p>

      {view==='garage' && <GarageView motos={motos} onAdd={addMoto} onSelect={(m)=>{setSelectedMoto(m); setView('dashboard')}} calcEuroKm={calcEuroKm} spese={spese} />}

      {view==='dashboard' && selectedMoto && <Dashboard moto={selectedMoto} spese={motoSpese(selectedMoto.id)} scadenze={scadenze.filter(s=>s.moto_id===selectedMoto.id)} onBack={()=>setView('garage')} onAddSpesa={()=>setView('addSpesa')} calcEuroKm={calcEuroKm} onExport={()=>exportPDF(selectedMoto, motoSpese(selectedMoto.id))} />}

      {view==='addSpesa' && selectedMoto && <AddSpesaView moto={selectedMoto} onSave={(s)=>{addSpesa(s); setView('dashboard')}} onCancel={()=>setView('dashboard')} />}

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#1e293b',display:'flex',justifyContent:'space-around',padding:12}}>
        <button onClick={()=>setView('garage')} style={{background:'none',border:0,color:'white'}}>🏠 Garage</button>
        <button onClick={()=>selectedMoto&&setView('dashboard')} style={{background:'none',border:0,color:'white'}}>📊 Dashboard</button>
        <button onClick={()=>selectedMoto&&setView('addSpesa')} style={{background:'#f97316',border:0,color:'white',padding:'8px 16px',borderRadius:20,fontWeight:700}}>+ Spesa</button>
      </div>
    </div>
  )
}

function GarageView({motos, onAdd, onSelect, calcEuroKm, spese}){
  const [form,setForm]=useState({nome:'',marca:'Yamaha',modello:'',km_attuali:0})
  const [showForm,setShowForm]=useState(false)
  return (
    <div>
      {motos.length===0 && <div className="card" style={{textAlign:'center',padding:32}}><p>🏍️ Nessuna moto nel garage</p><p style={{fontSize:14,opacity:0.6}}>Aggiungi la tua prima moto per iniziare a tracciare costi e consumi</p></div>}
      {motos.map(m=>(
        <div key={m.id} className="card" onClick={()=>onSelect(m)} style={{cursor:'pointer'}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div><strong style={{fontSize:18}}>{m.nome}</strong><br/><span style={{opacity:0.6}}>{m.marca} {m.modello} - {m.km_attuali} km</span></div>
            <div style={{textAlign:'right'}}><div style={{fontSize:20,fontWeight:800, color:'#f97316'}}>€{calcEuroKm(m.id)}/km</div><div style={{fontSize:12,opacity:0.6}}>{spese.filter(s=>s.moto_id===m.id).length} spese</div></div>
          </div>
        </div>
      ))}
      {!showForm ? <button className="btn" onClick={()=>setShowForm(true)}>+ Aggiungi Moto</button> :
      <div className="card">
        <h3>Nuova Moto</h3>
        <input className="input" placeholder="Nome: es. Tracer 9" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} />
        <input className="input" placeholder="Marca" value={form.marca} onChange={e=>setForm({...form,marca:e.target.value})} />
        <input className="input" placeholder="Modello" value={form.modello} onChange={e=>setForm({...form,modello:e.target.value})} />
        <input className="input" type="number" placeholder="Km attuali" value={form.km_attuali} onChange={e=>setForm({...form,km_attuali:Number(e.target.value)})} />
        <button className="btn" onClick={()=>{if(form.nome){onAdd(form); setShowForm(false); setForm({nome:'',marca:'Yamaha',modello:'',km_attuali:0})}}}>Salva in Garage</button>
      </div>}
    </div>
  )
}

function Dashboard({moto, spese, scadenze, onBack, onAddSpesa, calcEuroKm, onExport}){
  const totaleAnno = spese.filter(s=> new Date(s.data).getFullYear()===new Date().getFullYear()).reduce((a,b)=>a+Number(b.euro),0)
  const prossima = scadenze.sort((a,b)=> new Date(a.data_scadenza)-new Date(b.data_scadenza))[0]
  return (
    <div>
      <button onClick={onBack} style={{background:'none',border:0,color:'#94a3b8'}}>← Garage</button>
      <h2>{moto.nome} - {moto.km_attuali} km</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <div className="card"><small>€/KM</small><div style={{fontSize:22,fontWeight:800}}>{calcEuroKm(moto.id)}€</div></div>
        <div className="card"><small>SPESO 2026</small><div style={{fontSize:22,fontWeight:800}}>{totaleAnno.toFixed(0)}€</div></div>
        <div className="card"><small>KM FATTI</small><div style={{fontSize:22,fontWeight:800}}>{spese.length>1 ? Math.max(...spese.map(s=>s.km_moto||0))-Math.min(...spese.map(s=>s.km_moto||0)) : 0} km</div></div>
        <div className="card"><small>PROSSIMA SCADENZA</small><div style={{fontSize:14,fontWeight:700}}>{prossima ? `${prossima.tipo} ${new Date(prossima.data_scadenza).toLocaleDateString()}` : 'Nessuna'}</div></div>
      </div>
      <button className="btn" onClick={onAddSpesa} style={{marginTop:12}}>+ Aggiungi Rifornimento / Spesa</button>
      <button className="btn" onClick={onExport} style={{marginTop:8,background:'#334155'}}>📄 Esporta PDF Annuale</button>
      <h3 style={{marginTop:24}}>Ultime spese</h3>
      {spese.slice(-10).reverse().map(s=>(
        <div key={s.id} className="card" style={{display:'flex',justifyContent:'space-between'}}>
          <div><strong>{s.tipo}</strong><br/><small>{new Date(s.data).toLocaleDateString()} - {s.km_moto}km {s.litri? `- ${s.kml||''} km/l`:''}</small></div>
          <div style={{fontWeight:800}}>{s.euro}€</div>
        </div>
      ))}
    </div>
  )
}

function AddSpesaView({moto, onSave, onCancel}){
  const [tipo,setTipo]=useState('rifornimento')
  const [form,setForm]=useState({km_moto:moto.km_attuali, euro:'', litri:'', note:'', officina:''})
  const [kml,setKml]=useState(0)

  const handleSave=()=>{
    const km = Number(form.km_moto)
    const euro = Number(form.euro)
    const litri = Number(form.litri)
    const lastKm = moto.km_attuali
    const kmlCalc = litri>0 && km>lastKm ? ((km-lastKm)/litri).toFixed(1) : 0
    onSave({moto_id:moto.id, tipo, km_moto:km, euro, litri, kml:kmlCalc, note:form.note, officina:form.officina})
  }

  return (
    <div>
      <button onClick={onCancel} style={{background:'none',border:0,color:'#94a3b8'}}>← Dashboard</button>
      <h2>Nuova Spesa - {moto.nome}</h2>
      <div style={{display:'flex',gap:8,overflowX:'auto',padding:'8px 0'}}>
        {['rifornimento','tagliando','gomme','bollo','assicurazione','accessori'].map(t=>(
          <button key={t} onClick={()=>setTipo(t)} style={{padding:'8px 12px',borderRadius:20,border:0,background: tipo===t?'#f97316':'#334155',color:'white',whiteSpace:'nowrap'}}>{t}</button>
        ))}
      </div>
      <div className="card">
        <label>KM attuali moto</label>
        <input className="input" type="number" value={form.km_moto} onChange={e=>setForm({...form,km_moto:e.target.value})} />
        <label>Euro spesi</label>
        <input className="input" type="number" placeholder="es. 25.50" value={form.euro} onChange={e=>setForm({...form,euro:e.target.value})} />
        {tipo==='rifornimento' && <>
          <label>Litri</label>
          <input className="input" type="number" placeholder="es. 15.2" value={form.litri} onChange={e=>setForm({...form,litri:e.target.value})} />
          <p style={{fontSize:12,opacity:0.6}}>💡 Trucco: scatta foto allo scontrino e inserisci i numeri a mano per ora. OCR automatico arriva nella v2 con ML Kit.</p>
        </>}
        <label>Officina / Note</label>
        <input className="input" placeholder="es. Motul, gommista Rossi" value={form.officina} onChange={e=>setForm({...form,officina:e.target.value})} />
        <button className="btn" onClick={handleSave}>Salva Spesa</button>
      </div>
    </div>
  )
}

function exportPDF(moto, spese){
  const doc = new jsPDF()
  doc.text(`Moto Diario - ${moto.nome} - Report ${new Date().getFullYear()}`, 10, 10)
  doc.text(`Km attuali: ${moto.km_attuali}`, 10, 20)
  const tot = spese.reduce((a,b)=>a+Number(b.euro||0),0)
  doc.text(`Totale speso: ${tot.toFixed(2)} EUR - ${spese.length} voci`, 10, 30)
  let y=40
  spese.forEach((s,i)=>{
    if(y>270){doc.addPage(); y=10}
    doc.text(`${new Date(s.data).toLocaleDateString()} | ${s.tipo} | ${s.km_moto}km | ${s.euro}€ ${s.litri? `| ${s.litri}L`:''}`, 10, y)
    y+=7
  })
  doc.save(`MotoDiario_${moto.nome}_${new Date().getFullYear()}.pdf`)
}
