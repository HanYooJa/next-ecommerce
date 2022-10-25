import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import data from '../../utils/data'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Store } from '../../utils/Store'

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store)

  const { query } = useRouter()
  const { slug } = query
  const product = data.products.find((x) => x.slug === slug)
  console.log(product)

  if (!product) {
    return <div> Product Not Found. 그런 상품이 없습니다. </div>
  }
  const router = useRouter()
  const addToCartHandler = () => {
    console.log(state.cart.cartItems)
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product.countInStock < quantity) {
      alert('Sorry. 재고가 부족합니다.')
      return
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    router.push('/cart')
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>

        <ul>
          <li>
            <h1 className="text-lg">{product.name}</h1>
          </li>
          <li>Category:{product.category}</li>
          <li>Brand:{product.brand}</li>
          <li>Description: {product.description}</li>
        </ul>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'in stock' : 'Unavailable'}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              카트에 넣기
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}