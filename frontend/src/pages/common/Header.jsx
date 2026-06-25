import { MdShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import {NavLink} from "react-router-dom";

export default function Header(){
  return (
    <nav className="sticky top-0 bg-transparent backdrop-blur-md text-black py-4">
      <div className="container mx-auto flex items-center justify-between ">


        <div>
          
        </div>


        <ul className="hidden md:flex justify-center gap-10 text-lg font-medium">

          <li>
            <NavLink to="/" className="hover : text-black-200">
            Home
            </NavLink>
          </li>


           <li>
             <NavLink to="/products" className="hover : text-black-200">
            Product
            </NavLink>
          </li>


           <li>
             <NavLink to="/categories" className="hover : text-black-200">
            Categories
            </NavLink>
          </li>


           <li>
             <NavLink to="/about" className="hover : text-black-200">
            About Us
            </NavLink>
          </li>


           <li>
            <NavLink to="/contact" className="hover : text-black-200">
            Contact Us
            </NavLink>
          </li>

        </ul>

        <div className="flex justify-end items-center gap-10 text-2xl">

          <MdShoppingCart className="cursor-pointer hover:scale-110 transition"/>
          <FaHeart className="cursor-pointer hover:scale-110 transition"/>
          <FaRegUserCircle className="cursor-pointer hover:scale-110 transition"/>
        </div>
      </div>
    </nav>
  )
}
