USE [master]
GO
/****** Object:  Database [eco1%]    Script Date: 23/8/2023 09:05:21 ******/
CREATE DATABASE [eco1%]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'eco1%', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\eco1%.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'eco1%_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\eco1%_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [eco1%] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [eco1%].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [eco1%] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [eco1%] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [eco1%] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [eco1%] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [eco1%] SET ARITHABORT OFF 
GO
ALTER DATABASE [eco1%] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [eco1%] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [eco1%] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [eco1%] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [eco1%] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [eco1%] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [eco1%] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [eco1%] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [eco1%] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [eco1%] SET  DISABLE_BROKER 
GO
ALTER DATABASE [eco1%] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [eco1%] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [eco1%] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [eco1%] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [eco1%] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [eco1%] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [eco1%] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [eco1%] SET RECOVERY FULL 
GO
ALTER DATABASE [eco1%] SET  MULTI_USER 
GO
ALTER DATABASE [eco1%] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [eco1%] SET DB_CHAINING OFF 
GO
ALTER DATABASE [eco1%] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [eco1%] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [eco1%] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'eco1%', N'ON'
GO
ALTER DATABASE [eco1%] SET QUERY_STORE = OFF
GO
USE [eco1%]
GO
/****** Object:  User [alumno]    Script Date: 23/8/2023 09:05:21 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Opciones]    Script Date: 23/8/2023 09:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Opciones](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDpregunta] [int] NOT NULL,
	[opcion] [varchar](500) NOT NULL,
 CONSTRAINT [PK_Opciones] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Preguntas]    Script Date: 23/8/2023 09:05:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Preguntas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Pregunta] [varchar](500) NOT NULL,
	[Respuesta] [varchar](500) NOT NULL,
	[PorcentajeDificultad] [int] NOT NULL,
	[Explicacion] [varchar](5000) NOT NULL,
 CONSTRAINT [PK_Preguntas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Opciones] ON 

INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (1, 1, N'CO2')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (2, 1, N'CH4')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (3, 1, N'N20')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (4, 1, N'H20')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (5, 2, N'2037')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (6, 2, N'2038')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (7, 2, N'2039')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (8, 2, N'2040')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (9, 3, N'Desolación')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (10, 3, N'Insolar')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (12, 3, N'Consolador')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (13, 3, N'Invernadero')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (14, 7, N'abra')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (15, 7, N'eduza')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (16, 7, N'eón')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (18, 7, N'aca')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (19, 8, N'Mitigacion')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (20, 8, N'Adaptación')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (21, 9, N'Benjamin Baker')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (22, 9, N'Catherine Clark')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (24, 9, N'Daniel Davis')
INSERT [dbo].[Opciones] ([ID], [IDpregunta], [opcion]) VALUES (25, 9, N'Greta Thunberg')
SET IDENTITY_INSERT [dbo].[Opciones] OFF
GO
SET IDENTITY_INSERT [dbo].[Preguntas] ON 

INSERT [dbo].[Preguntas] ([id], [Pregunta], [Respuesta], [PorcentajeDificultad], [Explicacion]) VALUES (1, N'Cual de estos compuestos no pertenece a lla lista:', N'H20', 60, N'H20, ya que no es un gas de efecto invernadero.')
INSERT [dbo].[Preguntas] ([id], [Pregunta], [Respuesta], [PorcentajeDificultad], [Explicacion]) VALUES (2, N'Complete la siguiente serie de numeros:  2020, 2023, 2027, 2032, *, 2044, 2051.', N'2038', 80, N'2038, ya que se suma un numero x+1 en orden ascendente al anterior')
INSERT [dbo].[Preguntas] ([id], [Pregunta], [Respuesta], [PorcentajeDificultad], [Explicacion]) VALUES (3, N'Cual de las siguientes palabras no encaja en la siguiente serie:
', N'Invernadero', 20, N'Invernadero, es la unica palabra que no tiene "sol" dentro de su palabra.')
INSERT [dbo].[Preguntas] ([id], [Pregunta], [Respuesta], [PorcentajeDificultad], [Explicacion]) VALUES (7, N'Cualc del clos siguilentes vivens sen lel mhar?', N'eduza', 40, N'La pregunta tiene letras de mas, y las respuestas letras de menos. M eduza es el unico animal que vive en el mar, mientras que C abra, L eón y V aca no')
INSERT [dbo].[Preguntas] ([id], [Pregunta], [Respuesta], [PorcentajeDificultad], [Explicacion]) VALUES (8, N'Cual de las siguientes palabras tiene mas letras?', N'Mitigación', 25, N'Mitigación, repite la letra i dos veces, por lo que tiene 9, mientras uqe Adaptación repite la letra a tres veces, por lo que tiene 8 letras')
INSERT [dbo].[Preguntas] ([id], [Pregunta], [Respuesta], [PorcentajeDificultad], [Explicacion]) VALUES (9, N'Cual de los siguientes nombres no pertenece a la lista:', N'Greta Thunberg', 35, N'Greta Thunberg. Es el unico nombre que no empieza por la misma inicial tanto su nombre como su apellido')
SET IDENTITY_INSERT [dbo].[Preguntas] OFF
GO
ALTER TABLE [dbo].[Opciones]  WITH CHECK ADD  CONSTRAINT [FK_Opciones_Preguntas] FOREIGN KEY([IDpregunta])
REFERENCES [dbo].[Preguntas] ([id])
GO
ALTER TABLE [dbo].[Opciones] CHECK CONSTRAINT [FK_Opciones_Preguntas]
GO
USE [master]
GO
ALTER DATABASE [eco1%] SET  READ_WRITE 
GO
