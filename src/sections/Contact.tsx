'use client';

import React, { useRef, useState } from 'react';
import { gsap } from '../components/gsap';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { contactConfig } from '../content_option';
import { FaEnvelope } from 'react-icons/fa';
// import emailjs from '@emailjs/browser'; // 暫時屏蔽

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // 表單狀態管理
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // 表單驗證函數
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
    }

    if (!formData.email.trim()) {
      newErrors.email = '請輸入 Email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的 Email 格式';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = '請輸入主題';
    }

    if (!formData.message.trim()) {
      newErrors.message = '請輸入訊息內容';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 處理輸入變更
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 清除該欄位的錯誤訊息
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 表單提交處理 (暫時屏蔽)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    // 模擬發送過程
    setTimeout(() => {
      setSubmitStatus('success');
      setStatusMessage(
        '表單功能暫時關閉，請直接發送 Email 到 song24707@gmail.com 與我聯繫。',
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);

    // 原本的 EmailJS 功能已暫時屏蔽
    /*
    try {
      // 初始化 EmailJS
      emailjs.init(contactConfig.YOUR_USER_ID);

      // 發送郵件
      const result = await emailjs.send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: contactConfig.YOUR_EMAIL,
        },
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setStatusMessage('訊息已成功發送！我會盡快回覆您。');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('發送失敗');
      }
    } catch (error) {
      console.error('EmailJS 錯誤:', error);
      setSubmitStatus('error');
      setStatusMessage('發送失敗，請稍後再試或直接發送 Email 給我。');
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 標題動畫
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // 內容區域動畫
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // 表單動畫
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // 社群連結動畫
      gsap.fromTo(
        socialRef.current?.children,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: socialRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id='contact'
      ref={sectionRef}
      className='py-5'
      data-testid='contact-section'
    >
      <div className='container text-center'>
        <div className='row'>
          <div className='col-12'>
            <h2 ref={titleRef} className='mb-5'>
              Contact Me
            </h2>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div ref={contentRef}>
              <h3 className='mb-4'>
                Let&apos;s create something great together
              </h3>
              <p className='lead font-accent mb-4'>
                {contactConfig.description}
              </p>

              <div className='mb-4'>
                <div className='d-flex align-items-center justify-content-center mb-3'>
                  <FaEnvelope
                    className='me-3'
                    style={{ color: 'var(--secondary-color)' }}
                  />
                  <a
                    href={`mailto:${contactConfig.YOUR_EMAIL}`}
                    className='text-decoration-none font-accent'
                    style={{
                      color: 'var(--secondary-color)',
                      fontSize: 'var(--font-size-3xl)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {contactConfig.YOUR_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            {/* 表單已完全屏蔽，程式碼保留在下方供日後使用 */}
            {false && (
              <form
                ref={formRef}
                className='contact-form'
                onSubmit={handleSubmit}
              >
                {/* 狀態訊息 */}
                {statusMessage && (
                  <div
                    className={`alert ${
                      submitStatus === 'success'
                        ? 'alert-success'
                        : 'alert-danger'
                    } mb-4`}
                  >
                    {statusMessage}
                  </div>
                )}

                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>
                    姓名{' '}
                    <span style={{ color: 'var(--secondary-color)' }}>*</span>
                  </label>
                  <input
                    type='text'
                    className={`form-control ${
                      errors.name ? 'is-invalid' : ''
                    }`}
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required
                  />
                  {errors.name && (
                    <div className='invalid-feedback'>{errors.name}</div>
                  )}
                </div>

                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email{' '}
                    <span style={{ color: 'var(--secondary-color)' }}>*</span>
                  </label>
                  <input
                    type='email'
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
                  )}
                </div>

                <div className='mb-3'>
                  <label htmlFor='subject' className='form-label'>
                    主題{' '}
                    <span style={{ color: 'var(--secondary-color)' }}>*</span>
                  </label>
                  <input
                    type='text'
                    className={`form-control ${
                      errors.subject ? 'is-invalid' : ''
                    }`}
                    id='subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required
                  />
                  {errors.subject && (
                    <div className='invalid-feedback'>{errors.subject}</div>
                  )}
                </div>

                <div className='mb-3'>
                  <label htmlFor='message' className='form-label'>
                    訊息{' '}
                    <span style={{ color: 'var(--secondary-color)' }}>*</span>
                  </label>
                  <textarea
                    className={`form-control ${
                      errors.message ? 'is-invalid' : ''
                    }`}
                    id='message'
                    name='message'
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required
                  ></textarea>
                  {errors.message && (
                    <div className='invalid-feedback'>{errors.message}</div>
                  )}
                </div>

                <button
                  type='submit'
                  className='btn btn-primary btn-lg w-100'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '發送中...' : '發送訊息'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
