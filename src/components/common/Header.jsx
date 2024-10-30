import { Link, useLocation } from "react-router-dom";
import { useZustandStore } from "../../hooks/useZustand";
import { FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Header({ menuOpen, menuClose }) {
	const { pathname } = useLocation();

	//sns 메뉴
	const snsArr = [FaEnvelope, FaInstagram, FaYoutube];
	const setMenuToggle = useZustandStore(state => state.setMenuToggle);

	if (menuOpen) {
		document.body.style.overflow = "hidden"; // 메뉴가 열리면 스크롤을 막음
	} else {
		document.body.style.overflow = "auto"; // 메뉴가 닫히면 스크롤을 다시 허용
	}

	return (
		<>
			<header className={`header ${pathname === "/" && "main"}`}>
				<div className="topUtil">
					<button className={`btnDetailMenu ${menuOpen ? "active" : ""}`} onClick={setMenuToggle}>
						<span className="top" />
						<span className="middle" />
						<span className="bottom" />
					</button>
				</div>

				<h1>
					<Link to={"/"} onClick={menuClose}>
						PSYH HOTEL
					</Link>
				</h1>

				{/* sns 설정 */}
				<nav>
					<ul className="sns">
						{snsArr.map((Data, idx) => (
							<li key={idx}>
								<Data />
							</li>
						))}
					</ul>
				</nav>
			</header>
		</>
	);
}
