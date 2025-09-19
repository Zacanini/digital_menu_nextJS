/**
 * Header Component - Sapore
 * 
 * Cabeçalho principal da aplicação com logo, navegação de categorias
 * e ícone do carrinho. Design elegante seguindo o design system italiano.
 */

'use client';

import Link from 'next/link';
import { ShoppingCart, MapPin, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { useCartStore } from '@/store/cart-store';

export function Header() {
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="bg-background border-b border-secondary/50 sticky top-0 z-50 backdrop-blur-sm">
      {/* Top Bar - Informações de contato */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Rua Giuseppe Verdi, 123 - Vila Italiana, SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-8888</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Aberto: Ter-Dom 18h às 23h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Logo Symbol - Pizza slice */}
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center transform transition-transform group-hover:scale-105">
                <span className="text-primary-foreground text-xl font-bold">🍕</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground">
                Sapore
              </h1>
              <p className="text-sm text-muted-foreground italic">
                Autêntica Pizzaria Italiana
              </p>
            </div>
          </Link>

          {/* Navigation - Categories */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="#salgadas"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Salgadas
            </Link>
            <Link 
              href="#doces"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Doces
            </Link>
            <Link 
              href="#veganas"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Veganas
            </Link>
            <Link 
              href="#especiais"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Especialidades
            </Link>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button - será implementado depois */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>

            {/* Cart Button */}
            <Button
              variant="outline"
              size="icon"
              className="relative hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Carrinho de compras"
              onClick={openCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {/* Cart Counter */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - será expandido depois */}
      <div className="lg:hidden border-t border-secondary/30">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex justify-center space-x-6 text-sm">
            <Link 
              href="#salgadas"
              className="text-foreground hover:text-primary transition-colors"
            >
              Salgadas
            </Link>
            <Link 
              href="#doces"
              className="text-foreground hover:text-primary transition-colors"
            >
              Doces
            </Link>
            <Link 
              href="#veganas"
              className="text-foreground hover:text-primary transition-colors"
            >
              Veganas
            </Link>
            <Link 
              href="#especiais"
              className="text-foreground hover:text-primary transition-colors"
            >
              Especiais
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}