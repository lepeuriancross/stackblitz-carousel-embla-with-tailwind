// Component: CarouselCustom
/*----------------------------------------------------------------------------------------------------*/

// 'use client // unguide for NextJS

// Imports - types / config
import type { EmblaCarouselProps } from '../../utility/Embla/EmblaCarousel';

// Imports - scripts (node)
import { useState, useEffect } from 'react';

// Imports - components
import EmblaCarousel from '../../utility/Embla/EmblaCarousel';

// Types
export type CarouselCustomProps = {
	title?: string;
	copy?: string;
	className?: string;
	children?: React.ReactNode;
};

// Component
export default function CarouselCustom(props: CarouselCustomProps) {
	// Props
	const { className, children } = props;

	// Store
	const [emblaProps, setEmblaProps] = useState<EmblaCarouselProps>();

	// Effects
	useEffect(() => {
		// Function - handleResize
		function handleResize() {
			// Calc props
			const windowWidth = window.innerWidth;
			const slidesToShow = windowWidth > 1024 ? 3 : windowWidth > 768 ? 2 : 1;
			const slideSpacing = windowWidth > 768 ? '2rem' : undefined;
			const emblaProps: EmblaCarouselProps = {
				slidesToShow,
				slideSpacing,
			};

			// Update state
			setEmblaProps(emblaProps);
		}

		// Add event listener
		window.addEventListener('resize', handleResize);

		// Init
		handleResize();

		// Clean up
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// If no emblaProps, return null
	if (!emblaProps) return null;

	// Render default
	return (
		<EmblaCarousel className={className} {...emblaProps}>
			{children}
		</EmblaCarousel>
	);
}
