// Component: SectionCarousel
/*----------------------------------------------------------------------------------------------------*/

// Imports - scripts (local)
import { classNames } from '../../lib/utils';

// Imports - components
import CarouselDefault from '../singles/Carousel/CarouselDefault';
import CarouselCustom from '../singles/Carousel/CarouselCustom';

// Types
export type SectionCarouselProps = {
	component?: 'default' | 'custom';
	title?: string;
	copy?: string;
	slides?: SectionCarouselSlideProps[];
	className?: string;
};
export type SectionCarouselSlideProps = {
	_type: 'slide';
	_key: string;
	title?: string;
	image?: string;
	description?: string;
	button?: {
		_type: 'button';
		linkText?: string;
		linkURL?: string;
		target?: '_self' | '_blank';
	};
};

// Component
export default function SectionCarousel(props: SectionCarouselProps) {
	// Props
	const { component = 'default', title, copy, slides, className } = props;

	// If component is 'custom', render custom
	if (component === 'custom')
		return (
			<div className={classNames('section even:bg-gray-50', className)}>
				<div className="section__container px-6 py-20 space-y-10 md:px-8">
					<div className="section__row container mx-auto space-y-6 text-center">
						{title && (
							<h2 className="section__title text-4xl font-bold">{title}</h2>
						)}
						{copy && (
							<div
								className="section__copy space-y-1"
								dangerouslySetInnerHTML={{ __html: copy }}
							/>
						)}
					</div>
					<div className="section__row container mx-auto">
						{slides && slides.length > 0 && (
							<CarouselCustom>
								{slides.map((slide, s) => (
									<SectionCarouselSlide key={`slide-${s}`} {...slide} />
								))}
							</CarouselCustom>
						)}
					</div>
				</div>
			</div>
		);

	// Render default
	return (
		<div className={classNames('section even:bg-gray-50', className)}>
			<div className="section__container px-6 py-20 space-y-10 md:px-8">
				<div className="section__row container mx-auto space-y-6 text-center">
					{title && (
						<h2 className="section__title text-4xl font-bold">{title}</h2>
					)}
					{copy && (
						<div
							className="section__copy space-y-1"
							dangerouslySetInnerHTML={{ __html: copy }}
						/>
					)}
				</div>
				<div className="section__row container mx-auto">
					{slides && slides.length > 0 && (
						<CarouselDefault>
							{slides.map((slide, s) => (
								<SectionCarouselSlide key={`slide-${s}`} {...slide} />
							))}
						</CarouselDefault>
					)}
				</div>
			</div>
		</div>
	);
}

// Component - SectionCarouselSlide
export function SectionCarouselSlide(props: SectionCarouselSlideProps) {
	// Props
	const { title, image, description, button } = props;

	// Render default
	return (
		<div
			className={classNames(
				`section__slide flex flex-col h-full rounded-lg ring-2 ring-inset overflow-hidden ring-gray-100`
			)}
		>
			{image && (
				<img className="section__slide-img block w-full h-auto" src={image} />
			)}
			{(title || description || button) && (
				<div className="section__slide-info flex flex-col grow p-8 space-y-2">
					{title && (
						<h3 className="section__slide-heading font-bold text-2xl">
							{title}
						</h3>
					)}
					{description && (
						<div
							className="section__slide-description space-y-1 text-sm"
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					)}
					{button && (
						<div className="section__slide-buttons flex flex-col justify-end grow pt-6">
							<a
								className="section__slide-button inline-flex justify-center items-center h-[50px] px-12 rounded-md transition-all cursor-pointer bg-primary hover:bg-primary-dark text-white"
								href={button.linkURL}
								target={button.target}
							>
								<span>Find out more</span>
							</a>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
