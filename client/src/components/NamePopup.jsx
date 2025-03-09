import Popup from 'reactjs-popup';

export default function NamePopup({handleSubmit, handleChange})  {
    return (
    <Popup
        closeOnDocumentClick={false}
        modal
        defaultOpen>
    {close => (
      <div className="modal">
        <div className="header"> Welocome to Tetris Game! </div>
        <div className='content'>
            Enter a username or leave it blank for a random one!
        </div>
        <form id="form" className="grid" onSubmit={(e) => {handleSubmit(e), close()}} >
            <input id="input" autoComplete="off" onChange={handleChange}/>
            <button type="submit">Join</button>
        </form>
      </div>
    )}
  </Popup>
)
};