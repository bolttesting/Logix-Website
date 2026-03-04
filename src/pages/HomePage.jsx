import Hero from '../components/Hero'
import Expertise from '../components/Expertise'
import Mission from '../components/Mission'
import BuildingTomorrow from '../components/BuildingTomorrow'
import CalculateCost from '../components/CalculateCost'
import ClientCommits from '../components/ClientCommits'
import Testimonials from '../components/Testimonials'
import Clients from '../components/Clients'
import Newsletter from '../components/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Expertise />
      <Mission />
      <BuildingTomorrow />
      <CalculateCost />
      <ClientCommits />
      <Testimonials />
      <Clients />
      <Newsletter />
    </>
  )
}
