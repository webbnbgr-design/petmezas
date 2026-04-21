/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Languages, 
  Menu, 
  X,
  Award,
  Building2,
  ScrollText,
  Clock
} from 'lucide-react';
import { translations } from './translations';

export default function App() {
  const [lang, setLang] = useState<'el' | 'en'>('el');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'el' ? 'en' : 'el');

  return (
    <div className="min-h-screen font-sans selection:bg-midnight selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-steel/10' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-sm transition-colors ${scrolled ? 'bg-gold text-white' : 'bg-white text-midnight'}`}>
              <Scale size={20} />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-xl font-bold tracking-tight ${scrolled ? 'text-midnight' : 'text-midnight'}`}>
                Π. Γ. ΠΕΤΜΕΖΑΣ
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold opacity-70 ${scrolled ? 'text-steel' : 'text-steel'}`}>
                {lang === 'el' ? 'ΔΙΚΗΓΟΡΙΚΟ ΓΡΑΦΕΙΟ' : 'LAW OFFICE'}
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {Object.entries(t.nav).map(([key, label], index) => (
              <motion.a
                key={key}
                href={`#${key}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-xs uppercase tracking-widest font-semibold hover:text-gold transition-colors"
              >
                {label}
              </motion.a>
            ))}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-2 border border-gold/40 rounded-full text-[10px] font-bold tracking-widest hover:bg-gold hover:text-white hover:border-gold transition-all uppercase"
            >
              <Languages size={14} />
              {lang === 'el' ? 'English' : 'Ελληνικά'}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 w-full bg-white z-40 border-b border-steel/10 md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {Object.entries(t.nav).map(([key, label]) => (
                <a key={key} href={`#${key}`} className="text-sm font-semibold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase"
              >
                <Languages size={18} />
                {lang === 'el' ? 'English' : 'Ελληνικά'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-gold/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-midnight/10 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-1/4 w-1/4 h-1/4 bg-wine/5 rounded-full blur-[80px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold">
                {lang === 'el' ? 'ΕΓΚΡΙΤΟ ΔΙΚΗΓΟΡΙΚΟ ΓΡΑΦΕΙΟ' : 'ESTABLISHED LAW OFFICE'}
              </span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl font-bold leading-[1.1] mb-8 text-midnight">
              {t.hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-steel font-medium max-w-2xl mb-12 border-l-4 border-gold pl-6">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-6">
              <a 
                href="#practice" 
                className="px-10 py-5 bg-gold text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gold-light transition-all shadow-xl shadow-gold/20"
              >
                {t.nav.practice}
              </a>
              <a 
                href="#contact" 
                className="px-10 py-5 border border-midnight text-midnight text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-midnight hover:text-white transition-all underline-offset-4"
              >
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:col-span-4 lg:flex justify-end"
          >
            <div className="relative">
              <div className="w-64 h-80 border-2 border-gold/30 rounded-sm translate-x-6 translate-y-6" />
              <div className="absolute inset-0 w-64 h-80 luxury-gradient flex items-center justify-center p-12">
                <div className="text-center">
                  <Award size={64} className="text-gold/40 mx-auto mb-6" />
                  <div className="text-gold/30 font-serif italic text-4xl leading-none">P.G.P</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 opacity-30"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
            <div className="w-[1px] h-12 bg-midnight" />
          </motion.div>
        </div>
      </section>

      {/* The Office Section */}
      <section id="office" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-1 border border-gold/30 rounded-full text-[10px] font-bold tracking-widest text-gold uppercase mb-4">
                {t.office.title}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                {lang === 'el' ? 'Κύρος και Εμπιστοσύνη' : 'Prestige and Trust'}
              </h2>
              <div className="space-y-6 text-steel leading-relaxed text-lg">
                <p>{t.office.description}</p>
                <p>{t.office.bio}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <div className="text-3xl font-serif font-bold text-gold mb-1">30+</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-steel font-medium">
                    {lang === 'el' ? 'Χρόνια Εμπειρίας' : 'Years of Experience'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-gold mb-1">∞</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-steel font-medium">
                    {lang === 'el' ? 'Διεθνής Παρουσία' : 'International Presence'}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-12 bg-parchment rounded-sm"
            >
              <div className="absolute top-0 right-0 p-8">
                <Building2 size={120} className="text-midnight/5" />
              </div>
              <blockquote className="relative z-10">
                <p className="font-serif italic text-2xl text-midnight mb-8">
                  "{lang === 'el' ? 'Η νομική επιστήμη υπηρετεί την κοινωνία και την πρόοδο των εθνών.' : 'Legal science serves society and the progress of nations.'}"
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-[2px] bg-midnight" />
                  <span className="text-xs uppercase font-bold tracking-widest">Παντελής Γ. Πετμεζάς</span>
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diplomatic Status Section */}
      <section id="diplomatic" className="py-32 luxury-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#c5a059_1px,_transparent_1px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-24 h-24 mb-10 flex items-center justify-center border-2 border-gold/40 rounded-full"
            >
              <Globe size={40} className="text-gold" />
            </motion.div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              {t.diplomatic.title}
            </h2>
            <p className="text-gold-light italic text-xl mb-10">
              {t.diplomatic.subtitle}
            </p>
            <div className="w-20 h-[2px] bg-gold/40 mb-10" />
            <p className="text-white/80 leading-relaxed text-lg mb-12">
              {t.diplomatic.description}
            </p>
            
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-wine/20 border border-gold/20 rounded-full text-xs font-bold tracking-widest uppercase">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              {t.diplomatic.role}
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Practice */}
      <section id="practice" className="py-32 bg-parchment">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <div className="text-xs uppercase tracking-[0.3em] font-bold text-gold mb-4">
                {lang === 'el' ? 'ΥΠΗΡΕΣΙΕΣ' : 'SERVICES'}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                {t.practice.title}
              </h2>
            </div>
            <div className="h-[1px] flex-grow bg-gold/20 hidden md:block" />
          </header>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: t.practice.commercial,
                text: t.practice.commercialText,
                icon: <ScrollText className="text-gold" />,
                tags: lang === 'el' ? ['Συμφωνίες', 'Συγχωνεύσεις', 'Επιχειρήσεις'] : ['Agreements', 'Mergers', 'Business']
              },
              {
                title: t.practice.international,
                text: t.practice.internationalText,
                icon: <Globe className="text-gold" />,
                tags: lang === 'el' ? ['Επενδύσεις', 'Θεσμικό Πλαίσιο', 'Καναδάς'] : ['Investments', 'Framework', 'Canada']
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group p-10 bg-white border border-steel/10 hover:border-gold/30 transition-all hover:shadow-2xl hover:shadow-gold/5 flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-parchment flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold mb-6 group-hover:text-midnight transition-colors">
                  {item.title}
                </h3>
                <p className="text-steel leading-relaxed mb-8 flex-grow">
                  {item.text}
                </p>
                <div className="flex flex-wrap gap-2 pt-6 border-t border-steel/10">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] uppercase font-bold tracking-widest text-gold opacity-60">
                      {tag} {idx < item.tags.length - 1 && "•"}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals / Awards Mini Section */}
      <section className="py-20 bg-white border-y border-steel/10">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="flex flex-wrap items-center justify-around gap-12 opacity-30 grayscale contrast-125">
            <div className="flex items-center gap-3">
              <ScrollText size={32} />
              <span className="text-sm font-bold tracking-tighter">ΑΡΙΣΤΟΤΕΛΕΙΟ ΠΑΝΕΠΙΣΤΗΜΙΟ</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 size={32} />
              <span className="text-sm font-bold tracking-tighter">ΠΑΝΤΕΙΟ ΠΑΝΕΠΙΣΤΗΜΙΟ</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={32} />
              <span className="text-sm font-bold tracking-tighter">ΕΛΛΗΝΟΚΑΝΑΔΙΚΟ ΕΠΙΜΕΛΗΤΗΡΙΟ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">
                {t.contact.title}
              </h2>
              <p className="text-steel text-lg mb-12 max-w-sm">
                {lang === 'el' ? 'Παρακαλούμε επικοινωνήστε μαζί μας για τον προγραμματισμό μιας νομικής διαβούλευσης.' : 'Please contact us to schedule a legal consultation.'}
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-gold" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-widest text-gold mb-1">{lang === 'el' ? 'Διεύθυνση' : 'Address'}</h4>
                    <p className="text-lg font-medium">{t.contact.address}<br />{t.contact.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="text-gold" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-widest text-gold mb-1">{t.contact.phone}</h4>
                    <p className="text-lg font-medium">+30 2310 2XXXXX</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="text-gold" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-widest text-gold mb-1">{t.contact.email}</h4>
                    <p className="text-lg font-medium">office@petmezas-law.gr</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-midnight p-12 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <MapPin size={200} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <Clock className="text-steel" size={20} />
                  <span className="text-xs uppercase tracking-widest font-bold">
                    {lang === 'el' ? 'ΩΡΕΣ ΛΕΙΤΟΥΡΓΙΑΣ' : 'OPERATING HOURS'}
                  </span>
                </div>
                <div className="space-y-4 mb-12">
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span className="opacity-60">{lang === 'el' ? 'Δευτέρα - Παρασκευή' : 'Monday - Friday'}</span>
                    <span className="font-bold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span className="opacity-60">{lang === 'el' ? 'Σάββατο / Κυριακή' : 'Saturday / Sunday'}</span>
                    <span className="font-bold">{lang === 'el' ? 'Κατόπιν Ραντεβού' : 'By Appointment'}</span>
                  </div>
                </div>
                <div className="p-8 bg-white/5 border border-white/10">
                  <p className="font-serif italic text-lg leading-relaxed">
                    {lang === 'el' 
                      ? 'Η τοποθεσία μας στο Λιμάνι της Θεσσαλονίκης διευκολύνει την πρόσβαση για εταιρικούς πελάτες και διεθνείς επισκέπτες.' 
                      : 'Our location at the Port of Thessaloniki facilitates easy access for corporate clients and international visitors.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-parchment border-t border-steel/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-midnight">Π. Γ. ΠΕΤΜΕΖΑΣ</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">
                {lang === 'el' ? 'ΔΙΚΗΓΟΡΟΣ - ΕΠΙΤΙΜΟΣ ΠΡΟΞΕΝΟΣ' : 'LAWYER - HONORARY CONSUL'}
              </span>
            </div>
            
            <div className="flex gap-8">
              {Object.entries(t.nav).map(([key, label]) => (
                <a key={key} href={`#${key}`} className="text-[10px] uppercase tracking-widest font-bold text-steel hover:text-gold transition-colors">
                  {label}
                </a>
              ))}
            </div>
            
            <div className="text-[10px] uppercase tracking-widest font-bold text-steel">
              {t.footer.rights}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
