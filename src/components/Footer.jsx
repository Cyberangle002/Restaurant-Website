import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3 className="footer-title">MyRestaurant</h3>
        <p className="footer-text">
          Serving happiness with every bite. Fresh, delicious & delivered fast.
        </p>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MyRestaurant • All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
