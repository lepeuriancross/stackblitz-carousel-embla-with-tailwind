// Component: CarouselCustom
/*----------------------------------------------------------------------------------------------------*/

// 'use client // unguide for NextJS

// Imports - types / config
import type { EmblaCarouselType } from 'embla-carousel';
import type {
	EmblaCarouselProps,
	EmblaCarouselArrowProps,
	EmblaCarouselDotProps,
} from '../../utility/Embla/EmblaCarousel';

// Imports - scripts (node)
import { useState, useRef, useEffect } from 'react';

// Imports - scripts (local)
import { classNames } from '../../../lib/utils';

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

	// Refs
	const emblaCarouselRef = useRef<{
		emblaApi?: EmblaCarouselType;
		prev?: () => void;
		next?: () => void;
		select?: (index: number) => void;
	}>();

	// Store
	const [emblaProps, setEmblaProps] = useState<EmblaCarouselProps>();
	const [prevBtnDisabled, setPrevBtnDisabled] = useState<boolean>(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(false);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	// Effects
	useEffect(() => {
		// Function - handleResize
		function handleResize() {
			// Calc props
			const windowWidth = window.innerWidth;
			const slidesToShow = windowWidth > 1024 ? 3 : windowWidth > 768 ? 2 : 1;
			const slideSpacing = windowWidth > 768 ? '2rem' : '1.5rem';
			const fade = windowWidth > 768 ? false : true;
			const emblaProps: EmblaCarouselProps = {
				slidesToShow,
				slideSpacing,
				loop: true,
				fade,
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

	// Handlers
	const handlePrevButtonClick = () => {
		// Previous slide
		const prev = emblaCarouselRef.current?.prev;
		prev && prev();
	};
	const handleNextButtonClick = () => {
		// Next slide
		const next = emblaCarouselRef.current?.next;
		next && next();
	};
	const handleDotButtonClick = (index: number) => {
		// Select slide
		const select = emblaCarouselRef.current?.select;
		select && select(index);
	};

	// If no emblaProps, return null
	if (!emblaProps) return null;

	// Render default
	return (
		<div className={classNames(`carousel--custom space-y-10`, className)}>
			<div className="carousel__row">
				<EmblaCarousel
					ref={emblaCarouselRef}
					className="relative z-10"
					{...emblaProps}
					onUpdatePrev={setPrevBtnDisabled}
					onUpdateNext={setNextBtnDisabled}
					onUpdateIndex={setSelectedIndex}
					onUpdateSnaps={setScrollSnaps}
				>
					{children}
				</EmblaCarousel>
				<div className="carousel__buttons z-20 flex justify-center items-center pt-10 space-x-2 md:absolute md:top-20 md:right-8 md:pt-0">
					<CarouselCustomPrevButton
						disabled={prevBtnDisabled}
						onClick={handlePrevButtonClick}
					/>
					<CarouselCustomNextButton
						disabled={nextBtnDisabled}
						onClick={handleNextButtonClick}
					/>
				</div>
			</div>
			<div className="carousel__row">
				<div className="carousel__dots hidden justify-between space-x-4 md:flex">
					{scrollSnaps?.map((_, s) => (
						<CarouselCustomDotButton
							key={`dot-${s}`}
							className="grow"
							idx={s}
							isActive={s === selectedIndex}
							onClick={() => handleDotButtonClick(s)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

// Component - CarouselCustomPrevButton
export function CarouselCustomPrevButton(props: EmblaCarouselArrowProps) {
	// Props
	const { disabled, className, onClick } = props;

	// Render default
	return (
		<button
			className={classNames(
				`carousel__button--prev inline-flex justify-center items-center h-[50px] w-[50px] rounded-full ring-2 ring-inset transition-all duration-300 ease-out ring-black hover:bg-primary hover:ring-primary hover:text-white`,
				disabled && 'opacity-50',
				className
			)}
			type="button"
			disabled={disabled}
			onClick={onClick}
		>
			<svg
				className="carousel__button-svg size-5"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
					clipRule="evenodd"
				/>
			</svg>
		</button>
	);
}

// Component - CarouselCustomNextButton
export function CarouselCustomNextButton(props: EmblaCarouselArrowProps) {
	// Props
	const { disabled, className, onClick } = props;

	// Render default
	return (
		<button
			className={classNames(
				`carousel__button--next inline-flex justify-center items-center h-[50px] w-[50px] rounded-full ring-2 ring-inset transition-all duration-300 ease-out ring-black hover:bg-primary hover:ring-primary hover:text-white`,
				disabled && 'opacity-50',
				className
			)}
			type="button"
			disabled={disabled}
			onClick={onClick}
		>
			<svg
				className="carousel__button-svg size-5"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
					clipRule="evenodd"
				/>
			</svg>
		</button>
	);
}

// Component - CarouselCustomDotButton
export function CarouselCustomDotButton(props: EmblaCarouselDotProps) {
	// Props
	const { idx = 0, isActive, disabled, className, onClick } = props;

	// Render default
	return (
		<button
			className={classNames(
				`carousel__dot px-6 h-[50px] rounded-full ring-2 ring-inset transition-all duration-300 ease-out ring-black hover:bg-primary hover:ring-primary hover:text-white`,
				isActive && 'active bg-black text-white',
				className
			)}
			type="button"
			disabled={disabled}
			onClick={onClick}
		>
			<span>Page {idx}</span>
		</button>
	);
}
