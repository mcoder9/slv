'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/utils/useTheme'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

const rows = [
  {
    title: 'name',
    bodyNum: 1
  },
  {
    title: 'established',
    bodyNum: 1
  },
  {
    title: 'address',
    bodyNum: 1
  },
  {
    title: 'founders',
    bodyNum: 2
  },
  {
    title: 'capital',
    bodyNum: 1
  },
  {
    title: 'bank',
    bodyNum: 1
  },
  {
    title: 'kvk',
    bodyNum: 1
  },
  {
    title: 'certification',
    bodyNum: 6
  },
  {
    title: 'purpose',
    bodyNum: 1
  }
]

export default function CompanyInfoRow() {
  const t = useTranslations()
  const locale = useLocale()
  const { theme } = useTheme()

  return (
    <>
      <div className="relative mx-auto max-w-3xl p-3">
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.title}>
                <TableCell className="font-medium">
                  <p className="py-2">
                    {t(`company.CompanyInfoRow.${row.title}.title`)}
                  </p>
                </TableCell>
                <TableCell>
                  {Array.from({ length: row.bodyNum }).map((_, index) => (
                    <p key={`${row.title} p ${index}`} className="py-2">
                      {t(
                        `company.CompanyInfoRow.${row.title}.body${index + 1}`
                      )}
                    </p>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
