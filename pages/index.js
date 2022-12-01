import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import Product from '../models/Product'
//import data from '../utils/data'
import db from '../utils/db'

export default function Home({ products }) {
  return (
    <Layout title="Home Page">
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 
  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        {products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find().lean()
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}
