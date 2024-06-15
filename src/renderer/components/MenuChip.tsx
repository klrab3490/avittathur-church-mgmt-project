import { Link } from 'react-router-dom';

interface MenuChipProps {
  title: string;
  route: string;
  description: string;
}
function MenuChip({ title, route, description }: MenuChipProps) {
  return (
    <Link to={route}>
      <div className="relative px-10 py-6 rounded-lg shadow-lg cursor-pointer hover:bg-bgHover hover:text-white transition-colors">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default MenuChip;
