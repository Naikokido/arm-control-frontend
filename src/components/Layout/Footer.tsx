const Footer = () => {
  return (
    <footer className="bg-gray-100 py-2">
      <div className="max-w-screen-lg mx-auto">
        <p className="text-center text-gray-600">
          {`©️ ${new Date().getFullYear()} Arm Control. All rights reserved | Privacy Policy`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
