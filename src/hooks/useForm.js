import { useState, useCallback } from 'react'

export const useForm = (initial) => {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
    setErrors(er => ({ ...er, [name]: '' }))
  }, [])

  const validate = useCallback((rules) => {
    const errs = {}
    Object.entries(rules).forEach(([field, rule]) => {
      if (rule.required && !values[field]?.trim()) errs[field] = rule.message || 'Required'
    })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }, [values])

  const reset = useCallback(() => { setValues(initial); setErrors({}) }, [initial])

  return { values, errors, handleChange, validate, reset, setValues }
}
