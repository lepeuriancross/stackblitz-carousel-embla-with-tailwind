// Component: CarouselDefault
/*----------------------------------------------------------------------------------------------------*/

// Imports - components
import EmblaCarousel from '../../utility/Embla/EmblaCarousel';

// Types
export type CarouselDefaultProps = {
	title?: string;
	copy?: string;
	className?: string;
	children?: React.ReactNode;
};

// Component
export default function CarouselDefault(props: CarouselDefaultProps) {
	// Props
	const { className, children } = props;

	// Render default
	return (
		<EmblaCarousel
			className={className}
			{...{
				arrows: true,
				dots: true,
				loop: true,
				fade: true,
			}}
		>
			{children}
		</EmblaCarousel>
	);
}
