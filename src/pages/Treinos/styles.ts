import { styled } from '@stitches/react';

export const StyledHome = styled('div',{ display:'flex', width:'100vw', height:'100vh', backgroundColor:'#121212' });
export const Content = styled('main',{ flex:1, padding:'2rem', overflowY:'auto', backgroundColor:'#121212', color:'#fff', '& h1':{fontSize:'1.5rem'}, '& h2':{fontSize:'1rem', color:'#ccc'} });

export const SummaryCard = styled('div',{ display:'flex', gap:'2rem', background:'#1e1e1e', padding:'1rem', borderRadius:'8px', margin:'1rem 0', fontSize:'0.9rem', color:'#fff', alignItems:'center' });
export const FilterBar = styled('div',{ display:'flex', gap:'1rem', margin:'1rem 0', '& button':{padding:'0.5rem 1rem', border:'none', borderRadius:'4px', background:'#333', color:'#ccc', cursor:'pointer','&.active':{background:'#2d6cdf',color:'#fff'}}});
export const TreinoGrid = styled('div',{ display:'grid', gap:'1.5rem', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))' });
export const Badge = styled('span',{ padding:'2px 8px', borderRadius:'12px', fontSize:'0.75rem', fontWeight:600, variants:{ variant:{ completed:{backgroundColor:'#2d6cdf',color:'#fff'}, pending:{backgroundColor:'#555',color:'#ccc'}}}});
export const MuscleTag = styled('span',{ fontSize:'0.75rem', background:'#333', padding:'2px 6px', borderRadius:'4px', marginRight:'0.5rem', color:'#ccc' });
export const TreinoCard = styled('div',{ backgroundColor:'#1e1e1e', borderRadius:'8px', padding:'1.5rem', display:'flex', flexDirection:'column', gap:'0.75rem', boxShadow:'0 2px 8px rgba(0,0,0,0.5)', transition:'transform .15s', '&:hover':{transform:'translateY(-4px)'}, '& .info':{ display:'flex', alignItems:'center', gap:'0.5rem', color:'#ccc', fontSize:'0.875rem' }, '& .muscles':{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }, '& .actions':{ marginTop:'auto', display:'flex', gap:'0.5rem' }});
export const ProgressBarContainer = styled('div',{ width:'100%', height:'6px', background:'#333', borderRadius:'3px', overflow:'hidden' });
export const ProgressFill = styled('div',{ height:'100%', background:'#2d6cdf', borderRadius:'3px 0 0 3px' });
export const ActionButton = styled('button',{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', padding:'0.5rem', border:'none', borderRadius:'4px', background:'#2d6cdf', color:'#fff', cursor:'pointer', transition:'background .2s', '&:hover':{background:'#1b4fbf'} });
