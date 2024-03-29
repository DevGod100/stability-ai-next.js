'use client'

import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton = ({ setLoading }) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    setLoading(pending)
  }, [pending])

  return (
    <button type='submit' disabled={pending}>
      { pending ? 'Generating...' : 'Generate' }
    </button>
  )
}

export default SubmitButton