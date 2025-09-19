/**
 * Footer Component - Sapore
 * 
 * Rodapé da aplicação com informações de contato, endereço,
 * redes sociais e links úteis. Design premium italiano.
 */

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-secondary/50 mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-lg">🍕</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Sapore
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  Autêntica Pizzaria Italiana
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Desde 1947, nossa família italiana traz para o Brasil o verdadeiro sabor da 
              tradição napolitana. Cada pizza é preparada com ingredientes selecionados 
              e muito amor pela arte culinária.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4">
              <Link 
                href="https://instagram.com/saporedigitale" 
                className="w-10 h-10 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </Link>
              <Link 
                href="https://facebook.com/saporedigitale" 
                className="w-10 h-10 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </Link>
              <Link 
                href="https://twitter.com/saporedigitale" 
                className="w-10 h-10 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </Link>
            </div>
          </div>

          {/* Informações de Contato */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
              Contato
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium">Endereço</p>
                  <p className="text-sm text-muted-foreground">
                    Rua Giuseppe Verdi, 123<br />
                    Vila Italiana - São Paulo, SP<br />
                    CEP: 01234-567
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium">Telefone</p>
                  <p className="text-sm text-muted-foreground">(11) 99999-8888</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium">E-mail</p>
                  <p className="text-sm text-muted-foreground">contato@saporedigitale.com.br</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horário de Funcionamento */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
              Funcionamento
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-foreground font-medium">Terça a Domingo</p>
                    <p className="text-sm text-muted-foreground">18h00 às 23h00</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">Segunda-feira</p>
                    <p className="text-sm text-accent font-medium">Fechado</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-secondary/50">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Dica:</strong> Reserve sua mesa pelos nossos canais digitais!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-primary/5 border-t border-secondary/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © 2024 Sapore. Todos os direitos reservados.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Uma tradição italiana no coração de São Paulo desde 1947
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link 
                href="/privacidade" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link 
                href="/termos" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Termos de Uso
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Feito com</span>
                <span className="text-accent">❤️</span>
                <span className="text-muted-foreground">em São Paulo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}