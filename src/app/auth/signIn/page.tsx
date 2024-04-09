'use client'

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { IoIosEyeOff, IoMdEye, IoMdMail } from 'react-icons/io'
import { IoKey } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { signInWithGoogle } from '@/lib/features/auth/authSlice'
import { auth } from '@/lib/firebase'
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
    await dispatch(signInWithGoogle())

    await router.push('/movie')

    toast.success('ログインしました', toastConfig)
  }

  return (
    <div className="md:w-1/2 mx-auto">
      <h2 className="text-center font-bold text-xl md:text-4xl">
        ログイン画面
      </h2>
      <div className="flex flex-col gap-3 mt-6">
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
          className="btn btn-accent block md:w-64 mt-6 md:mt-12 mx-auto"
          onClick={signInWithEmail}>
          ログイン
        </button>
      </div>
      <div className="divider my-8">OR</div>
      <h3 className="text-md md:text-xl lg:text-2xl text-center font-bold my-3">
        SNSアカウントでログインする
      </h3>
      <div className="w-fit mx-auto">
        <button onClick={handleGoogleSignIn} className="btn btn-outline">
          <FcGoogle size={24} className="mr-2" />
          Googleでログイン
        </button>
      </div>
      <div className="divider my-8">OR</div>
      <div className="w-fit mt-6 mx-auto">
        <Link href={'/auth/signUp/'} className="flex items-center gap-2 ">
          新規会員登録
          <MdKeyboardArrowRight />
        </Link>
      </div>
    </div>
  )
}

export default SignIn
