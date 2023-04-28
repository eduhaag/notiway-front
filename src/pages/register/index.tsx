import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  CustomInput,
  FormContainer,
  HeaderContainer,
  RegisterContainer,
} from './styles'
import Logo from '../../assets/logo_vertical.png'
import { Button } from '../../components/Button'
import { mask, unMask } from 'remask'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, zipApi } from '../../lib/axios'
import {
  showErrorToast,
  showSuccessToast,
  showWarnToast,
} from '../../providers/toastProvider'
import { Root, Trigger } from '@radix-ui/react-alert-dialog'
import { PrivacityTermsModal } from '../../modals/PrivacityTermsModal'

const registerFormValidationSchema = z
  .object({
    name: z.string().nonempty({ message: 'Este campo é obrigatório' }),
    email: z
      .string()
      .email({ message: 'Digite um e-mail válido' })
      .nonempty({ message: 'Este campo é obrigatório' }),
    tax: z.string(),
    phone: z.string(),
    whatsapp: z.string().nonempty({ message: 'Este campo é obrigatório' }),
    zip: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    district: z.string(),
    city: z.string(),
    province: z.string(),
    marketingAgree: z.boolean(),
    password: z.string().nonempty().min(6),
    passwordConfirm: z.string().nonempty(),
  })
  .refine(({ passwordConfirm, password }) => password === passwordConfirm, {
    message: 'As senhas não conferem.',
    path: ['passwordConfirm'],
  })

type RegisterFormData = z.infer<typeof registerFormValidationSchema>

export function Register() {
  const [taxValue, setTaxValue] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [whatsappValue, setWhatsappValue] = useState('')
  const [zipValue, setZipValue] = useState('')
  const navigate = useNavigate()

  const {
    handleSubmit,
    reset,
    register,
    formState,
    setValue,
    setFocus,
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormValidationSchema),
  })

  const { errors } = formState

  function handleMaskedInputsChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    switch (e.target.name) {
      case 'tax':
        setTaxValue(
          mask(unMask(value), ['999.999.999-99', '99.999.999/9999-99']),
        )
        break
      case 'phone':
        setPhoneValue(
          mask(unMask(value), ['(99) 9999-9999', '(99) 9 9999-9999']),
        )
        break
      case 'whatsapp':
        setWhatsappValue(
          mask(unMask(value), ['(99) 9999-9999', '(99) 9 9999-9999']),
        )
        break
      case 'zip':
        setZipValue(mask(unMask(value), ['99999-999', '99999-999']))
        break
    }
  }

  function handleCancelClick() {
    reset()
    navigate('/')
  }

  async function handleZipBlur() {
    const zip = unMask(zipValue)

    try {
      const { data } = await zipApi.get(`/${zip}/json/`)
      if (data.erro) {
        setFocus('street')
        throw new Error('ZIP ERROR')
      }

      setValue('street', data.logradouro)
      setValue('district', data.bairro)
      setValue('city', data.localidade)
      setValue('province', data.uf)
      setFocus('number')
    } catch (error) {}
  }

  async function handleRegister(data: RegisterFormData) {
    const consumer = {
      ...data,
      tax_id: data.tax,
      fone: data.phone,
      zip_code: zipValue,
      marketingAgree: data.marketingAgree,
      privacityTermsAgree: true,
    }

    try {
      await api.post('/consumers', { ...consumer })
      reset()
      navigate('/')
      showSuccessToast('Cadastro realizado com sucesso.')
    } catch (error: any) {
      console.log(error)
      if (
        error.response &&
        error.response.data.message === 'E-mail already used.'
      ) {
        setError('email', { message: 'E-mail já cadastrado.' })
        showWarnToast('Este e-mail já foi cadastrado.')
      } else if (
        error.response &&
        error.response.data.message === 'Tax ID already exists.'
      ) {
        setError('tax', { message: 'Este CPF / CNPJ já está cadastrado.' })
        showWarnToast('Este CPF / CNPJ já está cadastrado.')
      } else {
        showErrorToast('Falha no cadastro. Tente Novamente')
      }
    }
  }

  return (
    <RegisterContainer>
      <HeaderContainer>
        <h1>Novo cadastro</h1>
        <img src={Logo} alt="" />
      </HeaderContainer>

      <FormContainer onSubmit={handleSubmit(handleRegister)}>
        <div className="input-group">
          <label htmlFor="name">
            Nome completo / Razão social <span>*</span>
          </label>
          <CustomInput
            className={errors.name ? 'input-error' : ''}
            type="text"
            id="name"
            {...register('name')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="mail">
            E-mail <span>*</span>
          </label>
          <CustomInput
            className={errors.email ? 'input-error' : ''}
            type="email"
            id="mail"
            {...register('email')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="tax">CPF / CNPJ </label>
          <CustomInput
            type="text"
            id="tax"
            className={errors.tax ? 'input-error' : ''}
            value={taxValue}
            placeholder="999.999.999-99"
            {...register('tax')}
            onChange={handleMaskedInputsChange}
          />
        </div>
        <div className="line-group">
          <div className="input-group">
            <label htmlFor="phone">Fone</label>
            <CustomInput
              type="text"
              id="phone"
              value={phoneValue}
              placeholder="(xx) 9 9999-9999"
              {...register('phone')}
              onChange={handleMaskedInputsChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="whatsapp">
              Whatsapp <span>*</span>
            </label>
            <CustomInput
              type="text"
              className={errors.whatsapp ? 'input-error' : ''}
              id="whatsapp"
              value={whatsappValue}
              placeholder="(xx) 9 9999-9999"
              {...register('whatsapp')}
              onChange={handleMaskedInputsChange}
            />
          </div>
        </div>
        <div className="line-group">
          <div className="input-group">
            <label htmlFor="password">
              Senha <span>*</span>
            </label>
            <CustomInput
              type="password"
              className={errors.password ? 'input-error' : ''}
              id="password"
              {...register('password')}
            />
            <small>A senha precisa ter no minimo 6 caracteres.</small>
          </div>
          <div className="input-group">
            <label htmlFor="passwordConfirm">
              Confirme a senha <span>*</span>
            </label>
            <CustomInput
              type="password"
              className={errors.passwordConfirm ? 'input-error' : ''}
              id="passwordConfirm"
              {...register('passwordConfirm')}
            />
          </div>
        </div>
        <h2>Endereço</h2>
        <hr />
        <div className="input-group">
          <label htmlFor="zip">Cep</label>
          <CustomInput
            type="text"
            width={'7.5rem'}
            value={zipValue}
            id="zip"
            {...register('zip')}
            placeholder="00000-000"
            onChange={handleMaskedInputsChange}
            onBlur={handleZipBlur}
          />
        </div>
        <div className="input-group">
          <label htmlFor="street">Logradouro</label>
          <CustomInput type="text" id="street" {...register('street')} />
        </div>
        <div className="line-group">
          <div className="input-group">
            <label htmlFor="number">Número</label>
            <CustomInput type="text" id="number" {...register('number')} />
          </div>
          <div className="input-group">
            <label htmlFor="complement">Complemento</label>
            <CustomInput
              type="text"
              id="complement"
              {...register('complement')}
              placeholder="Ex.: apto, quadra, bloco, etc."
            />
          </div>
        </div>
        <div className="line-group">
          <div className="input-group">
            <label htmlFor="district">Bairro</label>
            <CustomInput type="text" id="district" {...register('district')} />
          </div>
          <div className="input-group">
            <label htmlFor="city">Cidade</label>
            <CustomInput type="text" id="city" {...register('city')} />
          </div>
          <div className="input-group">
            <label htmlFor="state">UF</label>
            <select id="state" {...register('province')}>
              <option value=""></option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>
        </div>
        <div className="check-group">
          <CustomInput
            type="checkbox"
            id="check"
            {...register('marketingAgree')}
          />
          <label htmlFor="check">
            Aceito receber mensages sobre atualizações e promoções.
          </label>
        </div>
        <p>
          Ao clicar em enviar você aceita nossa{' '}
          <Root>
            <Trigger>
              <a className="terms">política de privacidade</a>.
            </Trigger>
            <PrivacityTermsModal />
          </Root>
        </p>
        <div className="action-group">
          <Button>Enviar</Button>
          <Button buttonProps={{ onClick: handleCancelClick }}>Cancelar</Button>
        </div>
      </FormContainer>
    </RegisterContainer>
  )
}
