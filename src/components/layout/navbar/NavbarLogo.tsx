
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-mrc-blue to-mrc-green">
        MRC en Poche
      </Link>
    </div>
  );
};

export default NavbarLogo;
