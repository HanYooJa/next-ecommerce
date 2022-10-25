import Layout from '../components/Layout'
import data from '../utils/data'
import ProductItem from '../components/ProductItem'

export default function Home() {
  return (
    <Layout title="Home Page">
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 
  lg:grid-cols-4"
      >
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  )
}