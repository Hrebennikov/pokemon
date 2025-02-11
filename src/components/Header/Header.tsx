import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex ">
        <Link to="/">
          <div>
            <h3 className="text-uppercase">Pokemon</h3>
          </div>
        </Link>
      </div>

      <ul className="d-flex">
        <li>
          <Link to="/favorites">
            <img
              className="mr-20 cu-p"
              width={18}
              height={18}
              src="/img/heart.svg"
              alt="Закладки"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
