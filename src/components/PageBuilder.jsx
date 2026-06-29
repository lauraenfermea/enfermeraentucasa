import Hero from './Hero'
import Services from './Services'
import FAQ from './FAQ'
import Rates from './Rates'
import Team from './Team'
import ReviewsSlider from './ReviewsSlider'
import BlogSection from './BlogSection'
import CtaBanner from './CtaBanner'

export default function PageBuilder({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <>
      {blocks.map((block, index) => {
        switch (block._type) {
          case 'hero':
            return <Hero key={block._key || index} {...block} />
          case 'services':
            return <Services key={block._key || index} {...block} />
          case 'faq':
            return <FAQ key={block._key || index} {...block} />
          case 'rates':
            return <Rates key={block._key || index} {...block} />
          case 'team':
            return <Team key={block._key || index} {...block} />
          case 'reviews':
            return <ReviewsSlider key={block._key || index} {...block} />
          case 'blogSection':
            return <BlogSection key={block._key || index} {...block} />
          case 'ctaBanner':
            return <CtaBanner key={block._key || index} {...block} />
          default:
            return (
              <div key={index} style={{ padding: '2rem', background: '#fee', color: '#900' }}>
                Unknown block type: {block._type}
              </div>
            )
        }
      })}
    </>
  )
}
