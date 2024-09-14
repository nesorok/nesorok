Chart.defaults.animation = false
Chart.defaults.aspectRatio = 1
Chart.defaults.interaction.intersect = false
Chart.defaults.interaction.mode = 'index'
Chart.defaults.layout.padding = 16
Chart.defaults.maintainAspectRatio = false
Chart.defaults.scales.time.time.displayFormats = { day: 'L' }
Chart.defaults.scales.time.time.tooltipFormat = 'L'
Chart.defaults.plugins.legend.labels.sort = (a, b) => a.text?.localeCompare(b.text)
Chart.defaults.plugins.legend.labels.usePointStyle = true
Chart.defaults.plugins.tooltip.borderWidth = 1
Chart.defaults.plugins.tooltip.itemSort = (a, b) => a.dataset.label?.localeCompare(b.dataset.label)
Chart.defaults.plugins.tooltip.usePointStyle = true
Chart.defaults.plugins.tooltip.position = 'pointer'

Chart.Tooltip.positioners.pointer = function (items, eventPosition) {
    return eventPosition
}

window.addEventListener('DOMContentLoaded', () => {
    // Список скважин.
    const wells = document.querySelector('#wells')

    // Элемент таблицы.
    const table = document.querySelector('#table')

    // Строка загрузки в таблице.
    const tableLoadingRow = document.querySelector('#table tbody tr:first-child')

    // Элемент холста для графика.
    const canvas = document.querySelector('#canvas')

    const chart = new Chart(canvas, {
        type: 'line',
        spanGaps: true,
        scales: {
            x: {
                type: 'time',
                position: 'bottom',
                time: {
                    minUnit: 'day',
                    unit: 'day',
                },
            },
            y: {
                position: 'left',
            },
            secondaryAxis: {
                position: 'right',
                grid: {
                    display: false,
                },
            },
        },
    })

    // Обработка события выбора скважины.
    wells.addEventListener('change', e => {
        loadData(e.target.value)
    })

    // Загружаем данные по выбранной по умолчанию скважине.
    loadData(wells.value)

    // Функция загрузки данных по скважине.
    function loadData(well) {
        return fetch(`data/${well}.json`)
            .then(response => response.json())
            .then(data => {
                populateTable(data)
                populateChart(data)
            })
            .catch(e => {
                alert('Ошибка: ' + e.message)
            })
    }

    // Наполняет таблицу данными.
    function populateTable(data) {
        tableLoadingRow.remove()

        const tableBody = table.querySelector('tbody')

        Array.from(tableBody.children).forEach(i => i.remove())

        data.forEach(item => {
            tableBody.append(createTableRow(item))
        })
    }

    // Наполняет график данными.
    function populateChart(data) {
        chart.config.data.datasets = [
            {
                borderColor: 'rgb(0, 128, 0)',
                backgroundColor: 'rgba(0, 128, 0, .5)',
                data: data.map(i => ({ x: formatDate(i.measured_at), y: i.oil_debit })),
                label: 'Дебит нефти, м³',
            },
            {
                borderColor: 'rgb(153, 51, 0)',
                backgroundColor: 'rgba(153, 51, 0, .5)',
                data: data.map(i => ({ x: formatDate(i.measured_at), y: i.fluid_debit })),
                label: 'Дебит жидкости, м³',
            },
            {
                borderColor: 'rgb(204, 153, 255)',
                backgroundColor: 'rgba(204, 153, 255, .5)',
                data: data.map(i => ({ x: formatDate(i.measured_at), y: i.environment_pressure })),
                label: 'Давление среды, атм.',
                pointStyle: 'crossRot',
            },
            {
                borderColor: 'rgb(51, 153, 102)',
                backgroundColor: 'rgba(51, 153, 102, .5)',
                data: data.map(i => ({ x: formatDate(i.measured_at), y: i.environment_temperature })),
                label: 'Температура среды, °C',
                pointStyle: 'crossRot',
            },
            {
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(255, 0, 0, .5)',
                data: data.map(i => ({ x: formatDate(i.measured_at), y: i.fluid_dynamic })),
                label: 'H динамическое, м.',
                yAxisID: 'secondaryAxis',
            },
        ]

        chart.update()
    }

    // Создаёт строку данных для таблицы.
    function createTableRow(item) {
        const row = document.createElement('tr')

        row.append(createTableCell(formatDate(item.measured_at)))
        row.append(createTableCell(formatDecimal(item.oil_debit)))
        row.append(createTableCell(formatDecimal(item.fluid_debit)))
        row.append(createTableCell(formatDecimal(item.water_cut)))
        row.append(createTableCell(formatDecimal(item.fluid_dynamic)))
        row.append(createTableCell(formatDecimal(item.annular_pressure)))
        row.append(createTableCell(formatDecimal(item.manifold_pressure)))
        row.append(createTableCell(formatDecimal(item.current)))
        row.append(createTableCell(formatDecimal(item.load)))
        row.append(createTableCell(item.test_status_name?.ru ?? ''))
        row.append(createTableCell(formatDecimal(item.environment_pressure)))
        row.append(createTableCell(formatDecimal(item.environment_temperature)))

        return row
    }

    // Создаёт ячейку с данными для строки таблицы.
    function createTableCell(text) {
        const cell = document.createElement('td')

        cell.className = 'border p-2'

        cell.innerText = text ?? ''

        return cell
    }

    // Форматирует дату.
    function formatDate(date) {
        if (date) {
            return new Date(date).toLocaleDateString('ru-Ru')
        }
    }

    // Форматирует число.
    function formatDecimal(decimal) {
        if (decimal) {
            return new Intl.NumberFormat('ru-Ru', { maximumFractionDigits: 2 }).format(decimal)
        }
    }
})
