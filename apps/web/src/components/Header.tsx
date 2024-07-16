import pcmgIcon from '@/assets/pcmg-icon.svg'
import Image from 'next/image'

export default function Header() {
  return (
    <div className="flex justify-center p-2">
      <div>
        <Image src={pcmgIcon} alt="icon pcmg " className="mr-2 size-32" />
      </div>
    </div>
  )
}
