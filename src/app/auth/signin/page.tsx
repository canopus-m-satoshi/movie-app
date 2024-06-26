'use client'

import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { IoIosEyeOff, IoMdEye, IoMdHelpCircle, IoMdMail } from 'react-icons/io'
import { IoKey } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { checkAuthStatus } from '@/lib/features/auth/authSlice'
import { signInAsAnonymous, signInWithGoogle } from '@/lib/firebase/auth'
import { auth } from '@/lib/firebase/firebase'
import { AppDispatch } from '@/lib/store'
import { toastConfig } from '@/lib/toastConfig'
const SignIn = () => {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const router = useRouter()

  const dispatch: AppDispatch = useDispatch()

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
  }
  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value)
  }

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput)
      toast.success('ログイン成功', toastConfig)
    } catch (error) {
      toast.success('ログイン失敗', toastConfig)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const signInSuccess = await signInWithGoogle()
      if (signInSuccess) {
        await router.push('/movie')
        await dispatch(checkAuthStatus())
        toast.success('ログインしました', toastConfig)
      } else {
        toast.error('ログインに失敗しました', toastConfig)
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
      toast.error('ログインに失敗しました', toastConfig)
    }
  }

  const signInWithAnonymously = async () => {
    try {
      await signInAsAnonymous(auth)
      await router.push('/movie')
      await dispatch(checkAuthStatus())
      toast.success('匿名でログインしました', toastConfig)
    } catch (error) {
      console.error('Error signing in anonymously:', error)
      toast.error('ログインに失敗しました', toastConfig)
    }
  }

  return (
    <div className="md:w-4/5 mx-auto">
      <h2 className="text-center font-bold text-xl md:text-4xl mb-10">
        ログインページ
      </h2>
      {/* <div className="flex flex-col gap-3 mt-6">
        <label className="input input-bordered flex items-center gap-2">
          <IoMdMail />
          <input
            type="email"
            className="grow"
            placeholder="Email"
            onChange={handleOnChangeEmail}
            value={emailInput}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 pr-0">
          <IoKey />
          <input
            type={isShowPassword ? 'text' : 'password'}
            className="grow"
            placeholder="Password"
            onChange={handleOnChangePassword}
            value={passwordInput}
          />
          <button className="btn btn-ghost" onClick={toggleShowPassword}>
            {isShowPassword ? <IoMdEye size={20} /> : <IoIosEyeOff size={20} />}
          </button>
        </label>
        <button
          className="btn btn-accent block md:w-64 mt-4 mx-auto"
          onClick={signInWithEmail}>
          ログイン
        </button>
      <div className="divider my-8">OR</div>
      </div> */}
      <h3 className="text-md md:text-xl lg:text-2xl text-center font-bold my-3">
        Googleアカウントで利用する
      </h3>
      <div className="w-fit mx-auto">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline mt-4 bg-white">
          <FcGoogle size={24} className="mr-2" />
          Googleでログイン
        </button>
      </div>
      <div className="divider my-8">OR</div>
      <h3 className="text-md md:text-xl lg:text-2xl text-center font-bold my-3">
        匿名で利用する
      </h3>
      <div className="w-fit mx-auto">
        <button
          className="btn btn-secondary block md:w-64 mt-4 mx-auto"
          onClick={signInWithAnonymously}>
          匿名でログイン
        </button>
      </div>
      <div
        role="alert"
        className="alert alert-warning mt-4 md:w-fit md:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>
          匿名でログインした場合、ログアウト時にお気に入りリストなど保存した情報はリセットされます。
        </span>
      </div>
      {/*  <div className="divider my-8">OR</div>
      <div className="w-fit mt-6 mx-auto">
        <Link href={'/auth/signup/'} className="flex items-center gap-2 ">
          新規会員登録
          <MdKeyboardArrowRight />
        </Link>
      </div> */}
    </div>
  )
}

export default SignIn
