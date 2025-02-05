import Layout from "../common/Layout";
import HomeVisual from "./HomeVisual";
import AboutUs from "./AboutUs";
import Offers from "./Offers";
import Facility from "./Facility";
import LocationScroll from "./LocationScroll";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
	const sideMenuArr = ["Home", "About us", "Offers", "Facilities", "Location"];
	const [currentPage, setCurrentPage] = useState(0);
	const [Scroll, setScroll] = useState(0);

	const ref_wrap = useRef(null);
	const ref_posArr = useRef([]);

	// 페이지별 디폴트 글씨 색상 맵
	const colorMap = {
		1: "#ffffff", // ABOUT US
		2: "#ffffff",
		3: "#ffffff",
		4: "#ffffff" // LOCATION
	};
	// currentPage에 따른 글씨 색상 지정 (기본값 white)
	const chColor = colorMap[currentPage] || "#ffffff"; // HOME

	// 스크롤 위치에 따라 currentPage 설정
	useEffect(() => {
		const handleScroll = () => {
			const newPage = ref_posArr.current.findIndex(pos => window.scrollY < pos + window.innerHeight / 2);

			setCurrentPage(newPage >= 0 ? newPage : sideMenuArr.length - 1);
			setScroll(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, [sideMenuArr.length]);

	// 리사이즈 및 섹션 위치 업데이트
	useEffect(() => {
		const handleResize = () => {
			ref_posArr.current = Array.from(ref_wrap.current.children).map(el => el.offsetTop);
			// 현재 페이지에 맞는 위치로 스크롤 이동
			window.scrollTo({ top: ref_posArr.current[currentPage], behavior: "smooth" });
		};
		handleResize(); // 초기 위치 설정
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [currentPage]);

	// 네비게이션 클릭 시 scrollTo가 끝난 후 currentPage 업데이트
	const handleNavClick = index => {
		window.scrollTo({ top: ref_posArr.current[index], behavior: "smooth" });
		setTimeout(() => setCurrentPage(index), 500); // 스크롤 애니메이션이 완료된 후 currentPage 설정
	};

	return (
		<Layout>
			<div className="mainNavigator">
				<div className="navigator">
					{sideMenuArr.map((page, index) => {
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0.5 }}
								animate={{
									opacity: currentPage === index ? 1 : 0.5
								}}
								transition={{ duration: 0.5 }}
								className={currentPage === index ? "divEl active" : "divEl"}
								onClick={() => handleNavClick(index)}
								style={{ cursor: "pointer", top: 40 * index }}>
								<div className="bar" style={{ background: chColor }}></div>
								<span style={{ color: chColor }}>{page}</span>
							</motion.div>
						);
					})}
				</div>
			</div>
			<div ref={ref_wrap}>
				<HomeVisual Sc={Scroll} pos={ref_posArr} />
				<AboutUs Sc={Scroll} pos={ref_posArr.current[1]} />
				<Offers Sc={Scroll} pos={ref_posArr.current[2]} />
				<Facility Sc={Scroll} pos={ref_posArr.current[3]} />
				<LocationScroll Sc={Scroll} pos={ref_posArr.current[4]} />
			</div>
		</Layout>
	);
}
