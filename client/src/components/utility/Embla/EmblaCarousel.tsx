// Component: EmblaCarousel
/*----------------------------------------------------------------------------------------------------
* Dependencies: embla-carousel, embla-carousel-react
----------------------------------------------------------------------------------------------------*/

// 'use client // unguide for NextJS

// Imports - scripts (node)
import {
	Children,
	Ref,
	useEffect,
	useImperativeHandle,
	forwardRef,
} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';

// Imports - scripts (local)
import { classNames } from '../../../lib/utils';
import {
	usePrevNextButtons,
	useDotButton,
} from './_partials/EmblaCarouselHooks';

// Types
export type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	prev: () => void;
	next: () => void;
};
export type UseDotButtonType = {
	selectedIndex: number;
	scrollSnaps: number[];
	select: (index: number) => void;
};
export type EmblaCarouselProps = {
	slidesToShow?: number;
	slidesToScroll?: number | 'auto';
	slideSpacing?: string;
	arrows?: boolean;
	dots?: boolean;
	loop?: boolean;
	fade?: boolean;
	className?: string;
	children?: React.ReactNode;
	onUpdatePrev?: (disabled: boolean) => void;
	onUpdateNext?: (disabled: boolean) => void;
	onUpdateIndex?: (index: number) => void;
	onUpdateSnaps?: (scrollSnaps: number[]) => void;
};
export type EmblaCarouselSlideWrapperProps = {
	isActive?: boolean;
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
};
export type EmblaCarouselArrowProps = {
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
};
export type EmblaCarouselDotProps = {
	idx?: number;
	isActive?: boolean;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
};

// Component
function EmblaCarousel(props: EmblaCarouselProps, ref: Ref<unknown>) {
	// Props
	const {
		slidesToShow = 1,
		slidesToScroll,
		slideSpacing = '0',
		arrows = false,
		dots = false,
		loop = false,
		fade = false,
		className,
		children,
		onUpdatePrev,
		onUpdateNext,
		onUpdateIndex,
		onUpdateSnaps,
	} = props;

	// Store
	const options = {
		slidesToScroll: slidesToScroll ?? 'auto',
		loop,
	};
	const extras = [];
	if (fade) extras.push(Fade());
	const [emblaRef, emblaApi] = useEmblaCarousel(options, extras);

	// Hooks
	const { prevBtnDisabled, nextBtnDisabled, prev, next } =
		usePrevNextButtons(emblaApi);
	const { selectedIndex, scrollSnaps, select } = useDotButton(emblaApi);

	// Handlers
	const handlePrevButtonClick = () => {
		// Previous slide
		prev();
	};
	const handleNextButtonClick = () => {
		// Next slide
		next();
	};
	const handleDotButtonClick = (index: number) => {
		// Select slide
		select(index);
	};

	// Effects
	useEffect(() => {
		onUpdatePrev && onUpdatePrev(prevBtnDisabled);
	}, [prevBtnDisabled, onUpdatePrev]);
	useEffect(() => {
		onUpdateNext && onUpdateNext(nextBtnDisabled);
	}, [nextBtnDisabled, onUpdateNext]);
	useEffect(() => {
		onUpdateIndex && onUpdateIndex(selectedIndex);
	}, [selectedIndex, onUpdateIndex]);
	useEffect(() => {
		onUpdateSnaps && onUpdateSnaps(scrollSnaps);
	}, [scrollSnaps, onUpdateSnaps]);

	// Imperative handle
	useImperativeHandle(ref, () => ({
		emblaApi,
		prev: handlePrevButtonClick,
		next: handleNextButtonClick,
		select: handleDotButtonClick,
	}));

	// If no children, return null
	if (!children) return null;

	// Init
	const slideSize = 100 / slidesToShow + '%';

	// Render default
	return (
		<div
			className={classNames(
				`carousel--embla space-y-8 overflow-hidden`,
				className
			)}
		>
			<div ref={emblaRef} className="carousel__viewport overflow-hidden">
				<div
					className="carousel__container flex touch-pan-y touch-pinch-zoom"
					style={{
						marginLeft: `-${slideSpacing}`,
					}}
				>
					{Children.map(children, (child, c) => (
						<EmblaCarouselSlideWrapper
							key={`slide-${c}`}
							style={{
								transform: `translate3d(0, 0, 0)`,
								minWidth: `${slideSize}`,
								paddingLeft: slideSpacing,
							}}
						>
							{child}
						</EmblaCarouselSlideWrapper>
					))}
				</div>
			</div>
			{(arrows || dots) && (
				<div className="carousel__buttons flex justify-between items-center">
					{arrows && (
						<div className="carousel__arrows inline-flex gap-2">
							<EmblaCarouselPrevButton
								disabled={prevBtnDisabled}
								onClick={handlePrevButtonClick}
							/>
							<EmblaCarouselNextButton
								disabled={nextBtnDisabled}
								onClick={handleNextButtonClick}
							/>{' '}
						</div>
					)}
					{dots && (
						<div className="carousel__dots inline-flex gap-2">
							{scrollSnaps.map((_, s) => (
								<EmblaCarouselDotButton
									key={`dot-${s}`}
									idx={s}
									isActive={s === selectedIndex}
									onClick={() => handleDotButtonClick(s)}
								/>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
export default forwardRef(EmblaCarousel);

// Component - CarouselEmbleSlide
export function EmblaCarouselSlideWrapper(
	props: EmblaCarouselSlideWrapperProps
) {
	// Props
	const { isActive, className, style, children } = props;

	// Render default
	return (
		<div
			className={classNames(
				`carousel__slide-wrapper`,
				isActive && 'active',
				className
			)}
			style={style}
		>
			{children}
		</div>
	);
}

// Component - EmblaCarouselNextButton
export function EmblaCarouselPrevButton(props: EmblaCarouselArrowProps) {
	// Props
	const { disabled, className, onClick } = props;

	// Render default
	return (
		<button
			className={classNames(
				`carousel__button--prev inline-flex justify-center items-center h-[50px] w-[50px] rounded-full transition-all duration-300 ease-out cursor-pointer bg-primary hover:bg-primary-dark text-white`,
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

// Component - EmblaCarouselNextButton
export function EmblaCarouselNextButton(props: EmblaCarouselArrowProps) {
	// Props
	const { disabled, className, onClick } = props;

	// Render default
	return (
		<button
			className={classNames(
				`carousel__button--next inline-flex justify-center items-center h-[50px] w-[50px] rounded-full transition-all duration-300 ease-out cursor-pointer bg-primary hover:bg-primary-dark text-white`,
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

// Component - EmblaCarouselDotButton
export function EmblaCarouselDotButton(props: EmblaCarouselDotProps) {
	// Props
	const { isActive, disabled, className, onClick } = props;

	// Render default
	return (
		<button
			className={classNames(
				`carousel__dot w-4 h-4 rounded-full ring-2 ring-inset transition-all duration-300 ease-out ring-primary`,
				isActive && 'active bg-primary',
				className
			)}
			type="button"
			disabled={disabled}
			onClick={onClick}
		/>
	);
}
