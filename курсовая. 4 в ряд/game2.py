import sys 
import pygame

pygame.init()

w, h = 720, 800
FPS = 10
n, m = 6, 7
who_is, color = 1, (0, 0, 0) # Кто ходит
poses, mouse_pos = [], []
now_event = 0
is_win = True
non_stop = True
nichua = False
start_check = 0

pygame.display.set_caption('Four in line')
clock = pygame.time.Clock()
fonty = pygame.font.SysFont('Times new roman', 30)
sc = pygame.display.set_mode((w, h))
surf = pygame.Surface((w, h))

# созаём массив положений
for j in range(n):  
    poses.append([]) 
    for i in range(m):
        poses[j].append([])
        poses[j][i] = 0


# Принимает переменные типа real 
def analis_win_1(xy, const_xy):    # Диагональ \ 
    massiv = [poses[xy[0]][xy[1]]]
    kol = 0
    while (xy[0] - 1 >= 0) and (xy[1] - 1 >= 0):
        xy[0] -= 1 
        xy[1] -= 1
        massiv = [poses[xy[0]][xy[1]]] + massiv 
    xy = const_xy
    while (xy[0] + 1 <= n - 1) and (xy[1] + 1 <= m - 1):
        xy[0] += 1 
        xy[1] += 1
        massiv.append(poses[xy[0]][xy[1]]) 
    for i in range(len(massiv)):
        if (massiv[i] == who_is):
            kol += 1
            if kol >= 4:
                return win(who_is)
        else: 
            kol = 0


# Принимает переменные типа real
def analis_win_2(xy, const_xy):    # Диагональ /
    massiv = [poses[xy[0]][xy[1]]]
    kol = 0
    while (xy[0] - 1 >= 0) and (xy[1] + 1 <= m - 1):
        xy[0] -= 1 
        xy[1] += 1
        massiv = [poses[xy[0]][xy[1]]] + massiv 
    xy = const_xy
    while (xy[0] + 1 <= n - 1) and (xy[1] - 1 >= 0):
        xy[0] += 1 
        xy[1] -= 1
        massiv.append(poses[xy[0]][xy[1]]) 
    for i in range(len(massiv)):
        if (massiv[i] == who_is):
            kol += 1
            if kol >= 4:
                return win(who_is)
        else: 
            kol = 0


# Принимает переменные типа real
def analis_win_3(xy, const_xy):    # Горизонталь --
    massiv = [poses[xy[0]][xy[1]]]
    kol = 0
    while (xy[0] - 1 >= 0):
        xy[0] -= 1 
        massiv = [poses[xy[0]][xy[1]]] + massiv 
    xy = const_xy
    while (xy[0] + 1 <= n - 1):
        xy[0] += 1 
        massiv.append(poses[xy[0]][xy[1]]) 
    for i in range(len(massiv)):
        if (massiv[i] == who_is):
            kol += 1
            if kol >= 4:
                return win(who_is)
        else: 
            kol = 0


# Принимает переменные типа real
def analis_win_4(xy, const_xy):    # Вертикаль |
    massiv = [poses[xy[0]][xy[1]]]
    kol = 0
    while (xy[1] + 1 <= m - 1):
        xy[1] += 1
        massiv = [poses[xy[0]][xy[1]]] + massiv 
    xy = const_xy
    while (xy[1] - 1 >= 0):
        xy[1] -= 1
        massiv.append(poses[xy[0]][xy[1]]) 
    for i in range(len(massiv)):
        if (massiv[i] == who_is):
            kol += 1
            if kol >= 4:
                return win(who_is)
        else: 
            kol = 0

# Принимает переменные типа integer
def win(who_is):
    return False


while 1:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
    print(non_stop)
    if non_stop:
        lastEvent = now_event
        now_event = event.type

        if is_win:
            if color == (0, 0, 0):
                mouse = pygame.mouse.get_pos()
                pygame.draw.rect(surf, (200, 200, 200), (0, 0, w, h))
                fonty = pygame.font.SysFont('Times new roman', 40)
                start_button_1 = fonty.render('Начать игру', False, 'black')
                start_button_1_rect = start_button_1.get_rect(topleft= \
                                                              (w / 2 - 120, 
                                                               h / 2 - 40))
                if not start_button_1_rect.collidepoint(mouse):
                    start_button_1 = fonty.render('Начать игру', False, 'black')
                if start_button_1_rect.collidepoint(mouse):
                    start_button_1 = fonty.render('Начать игру', False, 'white')
                sc.blit(surf,(0, 0))
                sc.blit(start_button_1, start_button_1_rect)

                if start_button_1_rect.collidepoint(mouse) and \
                    pygame.mouse.get_pressed()[0]:
                    now_event = 0
                    is_win = False

        if is_win != True:
            start_check += 1
            if start_check > 5:
                start_check = 5
            print(start_check)
            # Если кликнули и туда можно бросить шар, то рисует там.  
            if (now_event != 0) and (event.type == pygame.MOUSEBUTTONDOWN) and \
               (lastEvent != now_event) and (poses[0][k] != 2) and \
               (poses[0][k] != 1) and start_check == 5:
                if mouse_pos[1] < 720:
                    if k > 6:
                        k = 6
                    for j in range(n):
                        if (poses[0][k] == 2) or (poses[0][k] == 1):
                            break
                        elif poses[n - 1 - j][k] == 0:
                            k2 = n - 1 - j
                            break
                    poses[k2][k] = who_is
                    analis = analis_win_1([k2, k], [k2, k])
                    if analis == False:
                        non_stop = False
                    analis = analis_win_2([k2, k], [k2, k])
                    if analis == False:
                        non_stop = False
                    analis = analis_win_3([k2, k], [k2, k])
                    if analis == False:
                        non_stop = False
                    analis = analis_win_4([k2, k], [k2, k])
                    if analis == False:
                        non_stop = False
                    kol2 = 0
                    for j in range(n):  
                        for i in range(m):
                            if poses[j][i] != 0: 
                                kol2 = kol2 + 1
                    if kol2 == 42: 
                        non_stop = False
                        nichua = True

                    if who_is == 1:
                        who_is = 2
                    else:
                        who_is = 1
            else:      # Если не кликали или нельзя бросить шар, рисует вероятное место.  
                mouse_pos = pygame.mouse.get_pos()
                if mouse_pos[1] < 720:
                    k = abs(mouse_pos[0] - 10) // 100 
                    if k > 6: 
                        k = 6
                    for j in range(n):
                        if (poses[0][k] == 2) or (poses[0][k] == 1):
                            break
                        elif poses[n - 1 - j][k] == 0:
                            k2 = n - 1 - j
                            if who_is == 1:
                                poses[k2][k] = 3
                            else:
                                poses[k2][k] = 4
                            break
                # k2 - нижняя свободная ячейка в нужном столбце.  

            # Отрисовка 
            pygame.draw.rect(surf, (200, 200, 200), (0, 0, w, h))
            for j in range(n):   
                for i in range(m):                  # Выбираем цвет в зависимости от номера в ячейке.  
                    if poses[j][i] == 1:
                        color = (255, 0, 0)
                    elif poses[j][i] == 2:
                        color = (0, 0, 255)
                    elif poses[j][i] == 0:
                        color = (200, 200, 200)
                    elif poses[j][i] == 3:
                        poses[j][i] = 0
                        color = (255, 130, 130)
                        pygame.draw.circle(surf, (255, 0, 0), 
                                           (60 + i * 100, 60), 45)
                    elif poses[j][i] == 4:
                        poses[j][i] = 0
                        color = (130, 130, 255)
                        pygame.draw.circle(surf, (0, 0, 255), 
                                           (60 + i * 100, 60), 45)
                    pygame.draw.circle(surf, color, 
                                       (60 + i * 100, 160 + j * 100), 45)
                    pygame.draw.circle(surf, (0, 0, 0), 
                                       (60 + i * 100, 160 + j * 100), 45, 4)
                    sc.blit(surf, (0,0))
    else: 
        fonty = pygame.font.SysFont('Times new roman', 85)
        if nichua:
            text_1 = fonty.render('Победила', False, 'red')
            text_1_rect = text_1.get_rect(topleft=(30, 15))
            text_2 = fonty.render('дружба!', False, 'blue')
            text_2_rect = text_2.get_rect(topleft=(400, 15))
        else:
            if who_is == 1:
                text_1 = fonty.render('Победа синих!', False, 'blue')
                text_1_rect = text_1.get_rect(topleft=(90, 15))
            if who_is == 2:
                text_1 = fonty.render('Победа красных!', False, 'red')
                text_1_rect = text_1.get_rect(topleft=(60, 15))
        sc.blit(text_1, text_1_rect)
        if nichua:
            sc.blit(text_2, text_2_rect)

    if not is_win:
        fonty = pygame.font.SysFont('Times new roman', 30)
        mouse = pygame.mouse.get_pos()
        start_button_2 = fonty.render('Заново', False, 'black')
        start_button_2_rect = start_button_2.get_rect(topleft=(30, h - 70))
        if not start_button_2_rect.collidepoint(mouse):
            start_button_2 = fonty.render('Заново', False, 'black')
        if start_button_2_rect.collidepoint(mouse):
            start_button_2 = fonty.render('Заново', False, 'white')
        sc.blit(start_button_2, start_button_2_rect)

        if start_button_2_rect.collidepoint(mouse) and \
                                            pygame.mouse.get_pressed()[0]:
            non_stop = True 
            for j in range(n):  
                for i in range(m):
                    poses[j][i] = 0
            who_is = 1

    pygame.display.update()
    clock.tick(FPS)