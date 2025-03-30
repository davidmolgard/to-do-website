const defaultHref = "src/assets/highlighter/highlight-1.svg";

interface highlightHeaderProps {
	text: string,
	href: string | undefined
}

function HighlightHeader(props: highlightHeaderProps) {
	let href = defaultHref;
	if (props.href) {
		href = props.href;
	}
	return (
		<div className="highlightHeader">
			{/* <h1 className="highlightedText">
				{props.text}
			</h1> */}
			<svg className="highlight" x="0" y="0">
				<image href={href}></image>
				<text className="text h1" x="0" y="60%">
					{props.text}
				</text>
			</svg>
		</div>
	);
}

export default HighlightHeader;