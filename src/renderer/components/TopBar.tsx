import { useLocation } from 'react-router-dom';
import backIcon from '../../img/chevron-left-solid.svg';

function TopBar() {
  const location = useLocation();
  const { pathname } = location;

  const handleBackClick = () => {
    if (pathname !== '/') {
      window.electron.ipcRenderer.sendMessage('reload-app');
    }
  };

  return (
    <div className="TopBar bg-bgOther px-10 py-28 rounded-xl text-white">
      <div className="flex gap-20 cursor-pointer">
        <button
          type="button"
          className={`flex flex-col justify-center items-center ring-2 rounded-xl ring-white p-2 ${
            pathname !== '/' ? 'flex' : 'hidden'
          }`}
          onClick={handleBackClick}
        >
          <img
            height={20}
            width={20}
            className="fill-white"
            src={backIcon}
            alt="Back Icon"
          />
          <h2 className="font-semibold text-xs">Go back</h2>
        </button>
        <div>
          <h2 className="font-extrabold text-2xl">Holy Family Church</h2>
          <p className="font-medium">Avittathur</p>
        </div>
      </div>
      <p className="float-right font-semibold">
        Holy Family Church,
        <br /> Avittathur, Thrissur - 680 683 <br />
        Ph : +91-480-2825058
      </p>
    </div>
  );
}

export default TopBar;
