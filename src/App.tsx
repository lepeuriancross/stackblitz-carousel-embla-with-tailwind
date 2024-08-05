// Component: App
/*----------------------------------------------------------------------------------------------------*/

// Imports - styles
import './App.css';

// Imports - components (local)
import SectionCarousel from './components/sections/SectionCarousel';

// Component
export default function App() {
	return (
		<div className="app w-full min-h-screen">
			<SectionCarousel
				component="default"
				title="Carousel Default"
				copy={`
					<p>The default carousel uses 'out-the-box' components to render arrows and dots</p>
				`}
				slides={[
					{
						_type: 'slide',
						_key: '0',
						image: 'https://picsum.photos/1920/1080?random=1',
					},
					{
						_type: 'slide',
						_key: '1',
						image: 'https://picsum.photos/1920/1080?random=2',
					},
					{
						_type: 'slide',
						_key: '2',
						image: 'https://picsum.photos/1920/1080?random=3',
					},
					{
						_type: 'slide',
						_key: '3',
						image: 'https://picsum.photos/1920/1080?random=4',
					},
					{
						_type: 'slide',
						_key: '4',
						image: 'https://picsum.photos/1920/1080?random=5',
					},
					{
						_type: 'slide',
						_key: '5',
						image: 'https://picsum.photos/1920/1080?random=6',
					},
				]}
			/>
			<SectionCarousel
				component="custom"
				title="Carousel Custom"
				copy={`
					<p>The custom carousel references certain functions and properties exposed by the EmblaCarousel component</p>
					<p>Arrows and Dots are completely custom</p>
				`}
				slides={[
					{
						_type: 'slide',
						_key: '0',
						title: 'Slide 1',
						image: 'https://picsum.photos/1920/1080?random=1',
						description: 'This is the first slide.',
						button: {
							_type: 'button',
							linkText: 'Learn More',
							linkURL: '#',
							target: '_self',
						},
					},
					{
						_type: 'slide',
						_key: '1',
						title: 'Slide 2',
						image: 'https://picsum.photos/1920/1080?random=2',
						description: 'This is the second slide.',
						button: {
							_type: 'button',
							linkText: 'Learn More',
							linkURL: '#',
							target: '_self',
						},
					},
					{
						_type: 'slide',
						_key: '2',
						title: 'Slide 3',
						image: 'https://picsum.photos/1920/1080?random=3',
						description: 'This is the third slide.',
						button: {
							_type: 'button',
							linkText: 'Learn More',
							linkURL: '#',
							target: '_self',
						},
					},
					{
						_type: 'slide',
						_key: '3',
						title: 'Slide 4',
						image: 'https://picsum.photos/1920/1080?random=4',
						description: 'This is the fourth slide.',
						button: {
							_type: 'button',
							linkText: 'Learn More',
							linkURL: '#',
							target: '_self',
						},
					},
					{
						_type: 'slide',
						_key: '4',
						title: 'Slide 5',
						image: 'https://picsum.photos/1920/1080?random=5',
						description: 'This is the fifth slide.',
						button: {
							_type: 'button',
							linkText: 'Learn More',
							linkURL: '#',
							target: '_self',
						},
					},
					{
						_type: 'slide',
						_key: '5',
						title: 'Slide 6',
						image: 'https://picsum.photos/1920/1080?random=6',
						description: 'This is the sixth slide.',
						button: {
							_type: 'button',
							linkText: 'Learn More',
							linkURL: '#',
							target: '_self',
						},
					},
				]}
			/>
		</div>
	);
}
