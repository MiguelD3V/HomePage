import {
  Bot,
  Boxes,
  Calendar,
  Check,
  FileCheck,
  Gauge,
  Globe,
  Handshake,
  Layers,
  MessageSquare,
  Megaphone,
  MousePointerClick,
  Palette,
  Search,
  Smartphone,
  Sparkles,
  Target,
  Unlock,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Registro de ícones por chave string.
 *
 * Existe porque componentes de função não são serializáveis através da
 * fronteira Server → Client. As constantes de conteúdo guardam a *chave*
 * do ícone; o componente resolve para o componente React na renderização.
 * Isso permite que o mesmo conteúdo alimente seções server e client.
 */
export const icons = {
  bot: Bot,
  boxes: Boxes,
  calendar: Calendar,
  check: Check,
  fileCheck: FileCheck,
  gauge: Gauge,
  globe: Globe,
  handshake: Handshake,
  layers: Layers,
  message: MessageSquare,
  megaphone: Megaphone,
  pointer: MousePointerClick,
  palette: Palette,
  search: Search,
  smartphone: Smartphone,
  sparkles: Sparkles,
  target: Target,
  unlock: Unlock,
  workflow: Workflow,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof icons;
