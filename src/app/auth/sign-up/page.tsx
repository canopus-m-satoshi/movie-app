'use client'

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import Link from 'next/link'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { IoIosEyeOff, IoMdEye, IoMdMail } from 'react-icons/io'
import { IoKey } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { toast } from 'react-toastify'

import { auth } from '@/lib/firebase/firebase'
import { toastConfig } from '@/lib/toastConfig'

const SignUp = () => {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
  }

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value)
  }

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, emailInput, passwordInput)
      toast.success('アカウント作成成功', toastConfig)
    } catch (error) {
      toast.error('アカウント作成失敗', toastConfig)
    }
  }

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => {
        console.error('Googleアカウントでのログイン失敗', error)
      })
  }

  return (
    <div className="md:w-1/2 mx-auto">
      <h2 className="text-center font-bold text-xl md:text-4xl">
        会員登録画面
      </h2>
      <div className="flex flex-col gap-3 mt-6">
        <label className="input input-bordered flex items-center gap-2">
          <IoMdMail />
          <input
            type="text"
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
          onClick={signUpWithEmail}>
          登録
        </button>
      </div>

      <div className="divider my-8">OR</div>
      <div className="w-fit mt-6 mx-auto">
        <Link href={'/auth/sign-in/'} className="flex items-center gap-2 ">
          アカウントをお持ちの方はこちら
          <MdKeyboardArrowRight />
        </Link>
      </div>
    </div>
  )
}

export default SignUp
