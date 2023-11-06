const Navbar = () => {
  return (
    <div className="navbar bg-base-200 px-2 lg:px-6">
      <div className="navbar-start">
        <a href='#' className="font-serif text-xl lg:text-2xl">Image Gallery</a>
      </div>

      <div className="navbar-end relative">
      
        <a className="btn">SignIn</a>
      </div>
    </div>
  );
};

export default Navbar;
