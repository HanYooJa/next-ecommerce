import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getError } from '../utils/error'

export default function LoginScreen() {
  const { data: session } = useSession()
  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const submithandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const githubLoginHandler = async () => {
    try {
      const result = await signIn('github', {
        redirect: false,
      })
      console.log('Github Login:' + result)
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const googlehubLoginHandler = async () => {
    try {
      const result = await signIn('google', {
        redirect: false,
      })
      console.log('Google Login:' + result)
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const kakaoLoginHandler = async () => {
    try {
      const result = await signIn('kakao', {
        redirect: false,
      })
      console.log('Kakao Login:' + result)
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const naverLoginHandler = async () => {
    try {
      const result = await signIn('naver', {
        redirect: false,
      })
      console.log('naver Login:' + result)
    } catch (err) {
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submithandler)}
      >
        <h1 className="text-xl mb-4">Login</h1>
        <div className="mb-4 bg-red-200 p-4 rounded-lg">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: '????????? ????????? ????????? ???????????????',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
            )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 3,
                message: '??????????????? 3?????? ???????????? ???????????????',
              },
            })}
            className="w-full mb-4"
            id="password"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <button className="primary-button" type="submit">
            Login
          </button>
        </div>
        <div className="mb-4">
          ????????? ????????? ???????????????. &nbsp;&nbsp;{''}
          <Link href="register">Register</Link>
        </div>

        <div className="p-5 bg-gray-500 p-4 rounded-lg">
          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={githubLoginHandler}
            >
              Github Login
            </button>
          </div>
          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={googlehubLoginHandler}
            >
              Goolge Login
            </button>
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={kakaoLoginHandler}
            >
              ????????? ?????????
            </button>
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={naverLoginHandler}
            >
              Naver Login
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}
