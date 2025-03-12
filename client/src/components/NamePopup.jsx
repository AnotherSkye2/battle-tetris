import Popup from 'reactjs-popup';

export default function NamePopup({open, handleSubmit, handleChange, errorMessage})  {
    return (
    <Popup
      open={open}
      closeOnDocumentClick={false}
      modal>
    {close => (
      <div className='pixel-corners--wrapper'>
      <div className="modal ">
        <div className="header"> Welcome to Tetris Game! </div>
        <div className='content'>
            Enter a userName or leave it blank for a random one!
        </div>
        <form id="form" className="grid" onSubmit={(e) => {handleSubmit(e), close()}} >
            <input id="input" className='pixel-corners' autoComplete="off" onChange={handleChange}/>
            <button type="submit" className='pixel-corners'>Join</button>
        </form>
        <p id='error-message'>{errorMessage}</p>
      </div>
      </div>
    )}
  </Popup>
)
};