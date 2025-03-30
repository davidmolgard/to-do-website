export enum highlightTypes {
	line="src/assets/highlighter/highlight-1.svg",
	block="src/assets/highlighter/highlight-2.svg",
	squiggle="src/assets/highlighter/highlight-3.svg",
}

export enum colors {
	red=0,
	orange=25,
	yellow=60,
	green=115,
	lightblue=175,
	blue=225,
	purple=285,
	pink=315
}

interface highlightHeaderProps {
	text: string,
	href?: highlightTypes,
	hue?: colors | number
}

function HighlightHeader(props: highlightHeaderProps) {
	let href = highlightTypes.line;
	let hue = colors.yellow;
	if (props.href) {
		href = props.href;
	}
	if (props.hue != undefined) {
		hue = props.hue;
	}
	return (
		<div className="highlightHeader">
			<svg className="highlight" x="0" y="0">
				<image style={{"filter": `hue-rotate(${hue}deg)`}} href={href}></image>
				<text textAnchor="middle" className="text h1" x="50%" y="65%">
					{props.text}
				</text>
			</svg>
		</div>
	);
}

export default HighlightHeader;