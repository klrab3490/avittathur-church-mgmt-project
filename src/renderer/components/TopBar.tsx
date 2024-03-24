import { useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../../img/chevron-left-solid.svg';

function TopBar() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  return (
    <div className="bg-bgOther px-10 py-10 rounded-xl text-textPrimary">
      <div className="flex gap-20 cursor-pointer">
        <button
          type="button"
          className={`flex flex-col justify-center items-center ring-2 rounded-xl ring-textPrimary p-2 ${
            pathname !== '/' ? 'flex' : 'hidden'
          }`}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img height={20} width={20} src={backIcon} alt="" />
          <h2 className="font-semibold text-xs">Go back</h2>
        </button>
        <div>
          <h2 className="font-extrabold text-2xl">Holy Family Church</h2>
          <p className="font-medium">Avittathur</p>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
