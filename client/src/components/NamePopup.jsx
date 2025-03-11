import Popup from 'reactjs-popup';

export default function NamePopup({handleSubmit, handleChange})  {
    return (
    <Popup
        closeOnDocumentClick={false}
        modal
        defaultOpen>
    {close => (
      <div className='pixel-corners--wrapper'>
      <div className="modal ">
        <div className="header"> Welcome to Tetris Game! </div>
        <div className='content'>
            Enter a username or leave it blank for a random one!
        </div>
        <form id="form" className="grid" onSubmit={(e) => {handleSubmit(e), close()}} >
            <input id="input" className='pixel-corners' autoComplete="off" onChange={handleChange}/>
            <button type="submit" className='pixel-corners'>Join</button>
        </form>
      </div>
      </div>
    )}
  </Popup>
)
};