import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import styles from "@/styles/Login.module.css";
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const id = formData.get('id')
    const password = formData.get('password')
 
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    })
 
    if (response.ok) {
      router.push('/home')
    } else {
      // Handle errors
    }
  }
 
  return (
    <>
    <h3 id={styles.loginHead}>Login Form</h3>
    <div className={`${styles.main}`}>
    <form onSubmit={handleSubmit} className={`${styles.loginForm}`}>
      <input className={`${styles.input}`} type="text" name="id" placeholder="ID" required />
      <input className={`${styles.input}`} type="password" name="password" placeholder="Password" required />
      <button className={`${styles.button}`} type="submit">Login</button>
    </form>
    </div>
    </>
  )
}