import { Link } from 'react-router-dom';

interface MenuChipProps {
  title: string;
  route: string;
  description: string;
}
function MenuChip({ title, route, description }: MenuChipProps) {
  return (
    <Link to={route}>
      <div className="cursor-pointer px-10 py-6 rounded-lg shadow-lg hover:bg-bgHover hover:transition-colors hover:text-white">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default MenuChip;
